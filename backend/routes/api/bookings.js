const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const {
	areIntervalsOverlapping,
	isAfter,
	isBefore,
	isEqual,
} = require("date-fns");

const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require("../../utils/auth");
const {
	Spot,
	SpotImage,
	Review,
	User,
	sequelize,
	ReviewImage,
	Booking,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
	const id = req.user.id;

	const booking = await Booking.findAll({
		where: {
			userId: id,
		},

		include: {
			model: Spot,
		},
	});

	const bookingList = [];

	booking.forEach((element) => {
		bookingList.push(element.toJSON());
	});

	//! TEST THIS
	if (!bookingList.length) {
		res.status(404);
		res.json({
			message: "Bookings couldn't be found",
		});
	}

	for (let i = 0; i < bookingList.length; i++) {
		let currBookingList = bookingList[i];

		const currSpot = await Spot.findAll({
			group: ["Spot.id", "Reviews.id"],
			where: { id: currBookingList.Spot.id },

			include: [
				{
					model: Review,
					attributes: [
						[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
						[sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
					],
				},
			],
		});

		let spotList = [];

		currSpot.forEach((spot) => {
			spotList.push(spot.toJSON());
		});

		//console.log(spotList[0].Reviews[0].avgRating);
		for (let j = 0; j < spotList.length; j++) {
			const currSpot = spotList[j];

			if (currSpot.Reviews[0]) {
				currSpot.numReviews = currSpot.Reviews[0].numReviews;
				currSpot.avgStarRating = Number(currSpot.Reviews[0].avgRating);
			}

			delete currSpot.Reviews;

			if (!currSpot.avgStarRating) {
				currSpot.avgStarRating = 0;
			}

		

			delete currSpot.avgRating;


			const images = await SpotImage.findAll({
				where: {
					spotId: currBookingList.Spot.id,
				},
			});

			if (images.length) {
				let imageList = [];

				images.forEach((image) => {
					imageList.push(image.toJSON());
				});

				for (let k = 0; k < imageList.length; k++) {
					let currImg = imageList[k];

					//delete currImg.spotId;
					if (currImg.isPreview === true) {
						currSpot.previewImage = currImg.url;
					}
				}

				currSpot.SpotImages = imageList;
				delete currSpot.SpotImages;

				currBookingList.spotId = currBookingList.Spot.id;
				currBookingList.Spot.previewImage = currSpot.previewImage;

				delete currBookingList.Spot.avgRating;
				delete currBookingList.Spot.description;
				delete currBookingList.Spot.createdAt;
				delete currBookingList.Spot.updatedAt;
			}
		}
	}

	res.json({ Bookings: bookingList });
});

router.put("/:bookingId", requireAuth, async (req, res) => {
	const userId = req.user.id;
	const bookingId = parseInt(req.params.bookingId);

	const { startDate, endDate } = req.body;

	const newStartDate = new Date(startDate);
	const newEndDate = new Date(endDate);

	const booking = await Booking.findAll({
		where: {
			id: bookingId,
		},
	});

	if (!booking.length) {
		res.status(404);
		return res.json({
			message: "Booking couldn't be found",
		});
	}
	const bookingList = [];

	booking.forEach((el) => {
		bookingList.push(el.toJSON());
	});

	const allBookings = await Booking.findAll({
		where: {
			spotId: bookingList[0].spotId,
			id: { [Op.not]: bookingId },
		},
	});


	if (bookingList[0].userId !== userId) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	if (newStartDate >= newEndDate) {
		res.status(400);
		return res.json({
			message: "Bad Request",
			errors: {
				endDate: "endDate cannot be on or before startDate",
			},
		});
	}

	const allBookingList = [];

	allBookings.forEach((el) => {
		allBookingList.push(el.toJSON());
	});

	const errors = {};
	//!Test This
	allBookingList.forEach((el) => {
		if (newEndDate === el.startDate) {
			errors.endDate = "End date conflicts with an existing booking";
			res.status(403);
			return res.json({
				message: "Sorry, this spot is already booked for the specified dates",
				errors: errors,
			});
		}

		if (isEqual(newStartDate, el.startDate)) {
			if (isEqual(newEndDate, el.endDate)) {
				errors.endDate = "End date conflicts with an existing booking";
			}
			errors.startDate = "Start date conflicts with an existing booking";
			res.status(403);
			return res.json({
				message: "Sorry, this spot is already booked for the specified dates",
				errors: errors,
			});
		}

		if (isEqual(newStartDate, el.endDate)) {
			errors.startDate = "Start date conflicts with an existing booking";
			res.status(403);
			return res.json({
				message: "Sorry, this spot is already booked for the specified dates",
				errors: errors,
			});
		}
		if (isEqual(newEndDate, el.startDate)) {
			errors.endDate = "End date conflicts with an existing booking";
			res.status(403);
			return res.json({
				message: "Sorry, this spot is already booked for the specified dates",
				errors: errors,
			});
		}
		if (isEqual(newEndDate, el.endDate)) {
			errors.endDate = "End date conflicts with an existing booking";
			res.status(403);
			return res.json({
				message: "Sorry, this spot is already booked for the specified dates",
				errors: errors,
			});
		}
		if (
			isBefore(newStartDate, el.endDate) &&
			isAfter(newStartDate, el.startDate)
		) {
			errors.startDate = "Start date conflicts with an existing booking";
			if (
				isBefore(newEndDate, el.endDate) &&
				isAfter(newEndDate, el.startDate)
			) {
				errors.endDate = "End date conflicts with an existing booking";
			}
			res.status(403);
			return res.json({
				message: "Sorry, this spot is already booked for the specified dates",
				errors: errors,
			});
		}

		if (isBefore(newEndDate, el.endDate) && isAfter(newEndDate, el.startDate)) {
			errors.endDate = "End date conflicts with an existing booking";
			res.status(403);
			return res.json({
				message: "Sorry, this spot is already booked for the specified dates",
				errors: errors,
			});
		}

		if (
			areIntervalsOverlapping(
				{
					start: newStartDate,
					end: newEndDate,
				},
				{
					start: el.startDate,
					end: el.endDate,
				},
				{ inclusive: false }
			)
		) {
			errors.startDate = "Start date conflicts with an existing booking";
			errors.endDate = "End date conflicts with an existing booking";
			res.status(403);
			return res.json({
				message: "Sorry, this spot is already booked for the specified dates",
				errors: errors,
			});
		}
	});



	const currBooking = await Booking.findByPk(bookingId);

	await currBooking.set({
		startDate: newStartDate,
		endDate: newEndDate,
	});

	await currBooking.save();

	return res.json(currBooking);
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
	const userId = req.user.id;
	const bookingId = parseInt(req.params.bookingId);

	const booking = await Booking.findAll({
		where: {
			id: bookingId,
		},
	});

	if (!booking.length) {
		res.status(404);
		return res.json({
			message: "Booking couldn't be found",
		});
	}
	const bookingList = [];

	booking.forEach((el) => {
		bookingList.push(el.toJSON());
	});

	if (bookingList[0].userId !== userId) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	if (bookingList[0].startDate <= new Date().toJSON) {
		res.status(403);
		return res.json({
			message: "Bookings that have been started can't be deleted",
		});
	}

	const currBooking = await Booking.findByPk(bookingId);

	await currBooking.destroy();

	res.json({
		message: "Successfully deleted",
	});
});

module.exports = router;
