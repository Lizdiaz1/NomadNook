const express = require("express");

const {
	areIntervalsOverlapping,
	isAfter,
	isBefore,
	isEqual,
} = require("date-fns");

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

const router = express.Router();

const validateCreate = [
	check("address")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Street address is required."),
	check("city")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("City is required."),
	check("state")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("State is required."),
	check("country")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Country is required."),
	check("lat")
		.exists({ checkFalsy: true })
		.notEmpty()
		.isFloat({ min: -90, max: 90 })
		.withMessage("Latitude is not valid."),
	check("lng")
		.exists({ checkFalsy: true })
		.notEmpty()
		.isFloat({ min: -180, max: 180 })
		.withMessage("Longitude is not valid."),
	check("name")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Name is required."),
	check("description")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Description is required."),
	check("price")
		.exists({ checkFalsy: true })
		.notEmpty()
		.isInt({ min: 1 })
		.withMessage("Price per day is required."),
	check("name")
		.isLength({
			max: 50,
		})
		.withMessage("Name must be less than 50 characters"),
	handleValidationErrors,
];

router.get("/", async (req, res) => {
	function isFloat(n) {
		return Number(n) === n && n % 1 !== 0;
	}

	let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
		req.query;

	minLat = Number(minLat);
	maxLat = Number(maxLat);
	minLng = Number(minLng);
	maxLng = Number(maxLng);
	minPrice = Number(minPrice);
	maxPrice = Number(maxPrice);

	const query = {};

	size = size === undefined ? 20 : parseInt(size);
	page = page === undefined ? 1 : parseInt(page);

	const errors = {};

	if (page < 1) {
		errors.page = "Page must be greater than or equal to 1";
	}

	if (size < 1) {
		errors.size = " Size must be greater than or equal to 1";
	}

	if (!isFloat(maxLat) || maxLat > 90 || maxLat < -90) {
		errors.maxLat = "Maximum Latitude is invalid";
	}
	if (!isFloat(minLat) || minLat < -90 || minLat > 90) {
		errors.minLat = "Minimum Latitude is invalid";
	}
	if (!isFloat(minLng) || minLng < -180 || minLng > 180) {
		errors.minLng = "Minimum longitude is invalid";
	}
	if (!isFloat(maxLng) || maxLng > 180 || maxLng < -180) {
		errors.maxLng = "Maximum longitude is invalid";
	}
	if (minPrice < 0) {
		errors.minPrice = "Minimum price must be greater than or equal to 0";
	}

	if (maxPrice < 0) {
		errors.maxPrice = "Maximum price must be greater than or equal to 0";
	}

	const searchQuery = {};

	if (minLat) {
		searchQuery.lat = { [Op.gte]: minLat };
	}

	if (maxLat) {
		searchQuery.lat = { [Op.lte]: maxLat };
	}

	if (minLat && maxLat) {
		searchQuery.lat = { [Op.between]: [minLat, maxLat] };
	}

	if (minLng) {
		searchQuery.lng = { [Op.gte]: minLng };
	}

	if (maxLng) {
		searchQuery.lng = { [Op.lte]: maxLng };
	}

	if (minLng && maxLng) {
		searchQuery.lng = { [Op.between]: [minLng, maxLng] };
	}

	if (minPrice) {
		searchQuery.price = { [Op.gte]: minPrice };
	}

	if (maxPrice) {
		searchQuery.price = { [Op.lte]: maxPrice };
	}

	if (minPrice && maxPrice) {
		searchQuery.price = { [Op.between]: [minPrice, maxPrice] };
	}

	

	if (page > 0 && size > 0) {
		query.limit = size;

		query.offset = size * (page - 1);
	}

	const yourSpots = await Spot.findAll({
		include: [
			{
				model: Review,
				attributes: ["stars"],
				},
			{
				model: SpotImage,
				attributes: ["url", "isPreview"],
			},
		],

		...query,

		where: searchQuery,
	});

	let spotList = [];



	yourSpots.forEach((spot) => {
		spotList.push(spot.toJSON());
	});

	if (minLat || minLng || maxLng || maxLat) {
		if (
			errors.page ||
			errors.size ||
			errors.maxLat ||
			errors.maxLng ||
			errors.minLat ||
			errors.minLng ||
			errors.minPrice ||
			errors.maxPrice
		) {
			res.status(400);
			return res.json({
				message: "Bad Request",
				errors: errors,
			});
		}
	}

	if (!spotList.length) {
		res.status(404);
		return res.json({
			message: "No Spots could be found ",
		});
	}

	if (spotList[0].Reviews) {
		for (let i = 0; i < spotList.length; i++) {
			const currSpot = spotList[i];
			let stars = 0;
			if (currSpot.Reviews) {
				for (let j = 0; j < currSpot.Reviews.length; j++) {
					const currReview = spotList[i].Reviews[j];
					stars += currReview.stars;

				}
				let avgRating = stars / currSpot.Reviews.length;
				if (avgRating) {
					avgRating = avgRating.toFixed(1);
					currSpot.avgRating = Number(avgRating);
				} else currSpot.avgRating = 0;

				//spotList[i].avgStarRating = spotList[i].Reviews[i].avgRating;
			}

			delete spotList[i].Reviews;
			// delete spotList[i].avgRating;
		}
	}
	let imageList = [];

	for (let i = 0; i < spotList.length; i++) {
		const currSpot = spotList[i];
		for (let j = 0; j < currSpot.SpotImages.length; j++) {
			let currImg = currSpot.SpotImages[j];

			if (currImg.isPreview === true) {
				currSpot.previewImage = currImg.url;
			}
		}
		delete currSpot.SpotImages;
	}

	imageList.forEach((image) => {
		imageList.push(image.toJSON());
	});

	return res.json({
		Spots: spotList,
		page,
		size,
	});
});

router.post("/", requireAuth, validateCreate, async (req, res) => {
	const { user } = req;
	if (user) {
		const safeUser = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
		};
	}

	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	try {
		const newSpot = await Spot.create({
			ownerId: req.user.id,
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		});

		const newSpotId = newSpot.dataValues.id;

		const returnSpot = await Spot.findByPk(newSpotId, {
			attributes: {
				exclude: ["avgRating", "previewImage"],
			},
		});

		//console.log(returnSpot);
		res.status(201);
		return res.json(returnSpot);
	} catch (error) {
		res.status(400);
		return res.json({
			message: "Bad Request",
			errors: error.errors[0].message,
		});
	}
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
	const spotId = req.params.spotId;
	const ownerId = req.user.id;
	const currSpot = await Spot.findByPk(spotId);
	const { url, preview } = req.body;

	if (!currSpot) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	if (ownerId !== currSpot.ownerId) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	const newImg = await SpotImage.create({
		url,
		spotId,
		isPreview: preview,
	});

	return res.json({
		id: newImg.id,
		url: newImg.url,
		preview: newImg.isPreview,
	});
});

router.get("/current", requireAuth, async (req, res) => {
	const ownerId = req.user.id;

	const yourSpots = await Spot.findAll({
		where: {
			ownerId: ownerId,
		},
		include: [
			{
				model: Review,
				attributes: ["stars"],

			},
			{
				model: SpotImage,
				attributes: ["url", "isPreview"],
			},
		],
	});

	if (!yourSpots.length) {
		return res.json({
			message: "You don't currently have any spots to rent!",
		});
	}

	let spotList = [];



	yourSpots.forEach((spot) => {
		spotList.push(spot.toJSON());
	});

	if (spotList[0].Reviews) {
		for (let i = 0; i < spotList.length; i++) {
			const currSpot = spotList[i];
			let stars = 0;
			if (currSpot.Reviews) {
				for (let j = 0; j < currSpot.Reviews.length; j++) {
					const currReview = spotList[i].Reviews[j];
					stars += currReview.stars;

				}
				let avgRating = stars / currSpot.Reviews.length;
				if (avgRating) {
					avgRating = avgRating.toFixed(1);
					currSpot.avgRating = Number(avgRating);
				} else currSpot.avgRating = 0;

				//spotList[i].avgStarRating = spotList[i].Reviews[i].avgRating;
			}

			delete spotList[i].Reviews;
			// delete spotList[i].avgRating;
		}
	}
	let imageList = [];

	for (let i = 0; i < spotList.length; i++) {
		const currSpot = spotList[i];
		for (let j = 0; j < currSpot.SpotImages.length; j++) {
			let currImg = currSpot.SpotImages[j];

			if (currImg.isPreview === true) {
				currSpot.previewImage = currImg.url;
			}
		}
		delete currSpot.SpotImages;
	}

	imageList.forEach((image) => {
		imageList.push(image.toJSON());
	});

	return res.json({ Spots: spotList });
});

router.get("/:spotId", async (req, res) => {
	const id = req.params.spotId;

	const testIfExist = await Spot.findByPk(id);

	if (!testIfExist) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	const currSpot = await Spot.findAll({
		group: ["Spot.id", "Reviews.id"],
		where: { id: id },

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


	if (spotList[0].Reviews[0]) {
		spotList[0].numReviews = spotList[0].Reviews[0].numReviews;
		spotList[0].avgStarRating = Number(spotList[0].Reviews[0].avgRating);
	} else spotList[0].numReviews = 0;

	delete spotList[0].Reviews;

	if (!spotList[0].avgStarRating) {
		spotList[0].avgStarRating = 0;
	}

	delete spotList[0].avgRating;

	const images = await SpotImage.findAll({
		where: {
			spotId: id,
		},
	});

	let imageList = [];

	images.forEach((image) => {
		imageList.push(image.toJSON());
	});

	for (let i = 0; i < imageList.length; i++) {
		let currImg = imageList[i];

		delete currImg.spotId;
		if (currImg.isPreview === true) {
			spotList[0].previewImage = currImg.url;
		}
	}

	spotList[0].SpotImages = imageList;

	const owner = await User.findAll({
		where: {
			id: spotList[0].ownerId,
		},
	});

	const ownerList = [];

	owner.forEach((owner) => {
		ownerList.push(owner.toJSON());
	});

	for (let i = 0; i < ownerList.length; i++) {
		let currOwner = ownerList[i];

		delete currOwner.username;
	}

	spotList[0].Owner = ownerList;

	res.json(spotList);
});

router.put("/:spotId", requireAuth, validateCreate, async (req, res) => {
	const ownerId = req.user.id;
	const spotId = req.params.spotId;
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	const spot = await Spot.findByPk(spotId, {
		attributes: {
			exclude: ["avgRating", "previewImage"],
		},
	});

	if (!spot) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	if (spot.ownerId !== ownerId) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	try {
		await spot.set({
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		});

		await spot.save();

		return res.json(spot);
	} catch (error) {
		res.status(400);
		return res.json({
			message: "Bad Request",
			errors: error.errors[0].message,
		});
	}
});

router.delete("/:spotId", requireAuth, async (req, res) => {
	const ownerId = req.user.id;
	const spotId = req.params.spotId;

	const spot = await Spot.findByPk(spotId, {
		attributes: {
			exclude: ["avgRating", "previewImage"],
		},
	});

	if (!spot) {
		res.status(404);
		return res.json({
			message: "Spot Couldn't be found",
		});
	}

	if (ownerId !== spot.ownerId) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	await spot.destroy();

	return res.json({
		message: "Successfully deleted",
	});
});

router.get("/:spotId/reviews", async (req, res) => {
	const { spotId } = req.params;

	const checkSpot = await Spot.findAll({
		where: {
			id: spotId,
		},
	});


	if (!checkSpot.length) {
		res.status(404);
		return res.json({
			message: "Spot Couldn't be found",
		});
	}

	const yourReviews = await Review.findAll({
		where: {
			spotId,
		},

		include: [
			{
				model: User,
				attributes: {
					exclude: [
						"username",
						"email",
						"hashedPassword",
						"createdAt",
						"updatedAt",
					],
				},
			},
			{
				model: Spot,
				attributes: {
					exclude: ["description", "avgRating", "createdAt", "updatedAt"],
				},
			},

		],
	});

	if (!yourReviews.length) {
		return res.json({
			message: "No Reviews Here Sorry :(",
		});
	}

	let reviewsList = [];

	yourReviews.forEach((Review) => {
		reviewsList.push(Review.toJSON());
	});


	for (let i = 0; i < reviewsList.length; i++) {
		let currReview = reviewsList[i];
		const id = currReview.Spot.id;
		const reviewId = currReview.id;
		const images = await SpotImage.findAll({
			where: {
				id,
			},
		});

		let imageList = [];

		images.forEach((image) => {
			imageList.push(image.toJSON());
		});
		const reviewImages = await ReviewImage.findAll({
			where: {
				reviewId,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt", "reviewId"],
			},
		});

		let reviewImageList = [];

		reviewImages.forEach((image) => {
			reviewImageList.push(image.toJSON());
		});

		currReview.ReviewImages = reviewImageList;
		for (let i = 0; i < imageList.length; i++) {
			let currImg = imageList[i];

			delete currImg.spotId;
			if (currImg.isPreview === true) {
				currReview.Spot.previewImage = currImg.url;
			}
			delete currReview.Spot;
		}
	}

	res.json({ Reviews: reviewsList });
});

const validateReview = [
	check("review")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Review text is required."),
	check("stars")
		.exists({ checkFalsy: true })
		.isInt({
			min: 1,
			max: 5,
		})
		.withMessage("Stars must be an integer from 1 to 5."),
	handleValidationErrors,
];

router.post(
	"/:spotId/reviews",
	requireAuth,
	validateReview,
	async (req, res) => {
		const { spotId } = req.params;
		const { review, stars } = req.body;
		const user = req.user.id;

		const checkSpot = await Spot.findAll({
			where: {
				id: spotId,
			},
			include: {
				model: Review,
			},
		});

		if (!checkSpot.length) {
			res.status(404);
			return res.json({
				message: "Spot couldn't be found",
			});
		}

		const spotList = [];

		checkSpot.forEach((el) => {
			spotList.push(el.toJSON());
		});


		for (let i = 0; i < spotList[0].Reviews.length; i++) {
			let currReview = spotList[0].Reviews[i];
			if (currReview.userId === user) {
				res.status(500);
				return res.json({
					message: "User already has a review for this spot",
				});
			}
		}

		const newReview = await Review.create({
			userId: user,
			spotId: parseInt(spotId),
			review,
			stars,
		});
		res.status(201);
		res.json(newReview);
	}
);

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
	const ownerId = req.user.id;
	const spotId = req.params.spotId;

	const spot = await Spot.findAll({
		where: {
			id: spotId,
		},

		attributes: {
			exclude: ["avgRating", "previewImage"],
		},

		include: {
			model: Booking,
		},
	});

	if (!spot) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	const spotList = [];

	spot.forEach((el) => {
		spotList.push(el.toJSON());
	});

	const bookings = await Booking.findAll({
		where: {
			spotId,
		},
		include: {
			model: User,
		},
	});

	const bookingList = [];

	bookings.forEach((el) => {
		bookingList.push(el.toJSON());
	});

	if (!bookingList.length) {
		res.status(404);
		res.json({
			message: "Bookings couldn't be found",
		});
	}

	if (!spot.length) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	if (spotList[0].ownerId !== ownerId) {
		bookingList.forEach((el) => {
			delete el.id;
			delete el.userId;
			delete el.createdAt;
			delete el.updatedAt;
			delete el.User;
		});

		return res.json({ Bookings: bookingList });
	}

	bookingList.forEach((el) => {
		delete el.User.username;
	});

	return res.json({ Bookings: bookingList });
});

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
	const ownerId = req.user.id;
	const spotId = parseInt(req.params.spotId);

	const { startDate, endDate } = req.body;

	const newStartDate = new Date(startDate);
	const newEndDate = new Date(endDate);

	const spot = await Spot.findAll({
		where: {
			id: spotId,
		},

		attributes: {
			exclude: ["avgRating", "previewImage"],
		},

		include: {
			model: Booking,
		},
	});

	const spotList = [];

	spot.forEach((el) => {
		spotList.push(el.toJSON());
	});

	if (!spotList.length) {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
		});
	}

	const bookings = await Booking.findAll({
		where: {
			spotId,
		},
		include: {
			model: User,
		},
	});

	const bookingList = [];

	bookings.forEach((el) => {
		bookingList.push(el.toJSON());
	});

	//console.log(spotList)

	if (spotList[0].ownerId === ownerId) {
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

	const errors = {};

	bookingList.forEach((el) => {
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
			errors.startDate = "Start date conflicts with an existing";
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
	//console.log(errors);
	if (errors.startDate || errors.endDate) {
		res.status(403);
		return res.json({
			message: "Sorry, this spot is already booked for the specified dates",
			errors: errors,
		});
	}

	//console.log(newStartDate, newEndDate, startDate, endDate);

	const userId = parseInt(ownerId);

	const newBooking = await Booking.create({
		spotId,
		userId,
		startDate,
		endDate,
	});

	await newBooking.save();

	return res.json(newBooking);
});

module.exports = router;
