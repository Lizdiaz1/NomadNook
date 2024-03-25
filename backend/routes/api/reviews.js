const express = require("express");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

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
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
	const userId = req.user.id;

	const yourReviews = await Review.findAll({
		where: {
			userId,
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
		}
	}

	res.json({ Reviews: reviewsList });
});

router.post("/:reviewId/Images", requireAuth, async (req, res) => {
	let { reviewId } = req.params;

	const { url } = req.body;

	reviewId = parseInt(reviewId);

	const thisReview = await Review.findAll({
		where: {
			id: reviewId,
		},
	});

	if (!thisReview.length) {
		res.status(404);
		return res.json({
			message: "Review couldn't be found",
		});
	}

	if (thisReview[0].dataValues.userId !== req.user.id) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	const reviewImages = await ReviewImage.findAll({
		where: {
			reviewId: reviewId,
		},
	});

	const reviewImageList = [];

	reviewImages.forEach((el) => {
		reviewImageList.push(el.toJSON());
	});

	if (reviewImageList.length >= 10) {
		res.status(403);
		return res.json({
			message: "Maximum number of images for this resource was reached",
		});
	}

	const thisReviewList = [];

	thisReview.forEach((el) => {
		thisReviewList.push(el.toJSON());
	});

	const newImg = await ReviewImage.create({
		reviewId,
		url,
	});

	await newImg.save();

	const newImgJson = await ReviewImage.findAll({
		where: {
			id: newImg.id,
		},
	});

	const thisImg = [];

	newImgJson.forEach((el) => {
		thisImg.push(el.toJSON());
	});

	delete thisImg[0].reviewId;
	delete thisImg[0].updatedAt;
	delete thisImg[0].createdAt;

	return res.json(thisImg[0]);
});

router.put("/:reviewId", requireAuth, async (req, res) => {
	const { reviewId } = req.params;

	const { review, stars } = req.body;

	const thisReview = await Review.findByPk(reviewId);

	const errors = {};

	if (!review || stars > 5 || stars < 1 || typeof stars !== typeof 1) {
		if (!review) {
			errors.review = "Review text is required";
		}

		if (stars > 5 || stars < 1) {
			errors.stars = "Stars must be an integer from 1 to 5";
		}

		if (typeof stars !== typeof 1) {
			errors.stars = "Stars must be an integer from 1 to 5";
		}

		res.status(400);
		return res.json({
			message: "Bad Request",
			errors,
		});
	}

	if (!thisReview) {
		res.status(404);
		res.json({
			message: "Review couldn't be found",
		});
	}
	if (thisReview.dataValues.userId !== req.user.id) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	await thisReview.set({
		review,
		stars,
	});

	await thisReview.save();

	res.json({ thisReview });
});

router.delete("/:reviewId", requireAuth, async (req, res) => {
	const { reviewId } = req.params;

	const thisReview = await Review.findByPk(reviewId);

	if (!thisReview) {
		res.status(404);
		return res.json({
			message: "Review couldn't be found",
		});
	}

	if (thisReview.dataValues.userId !== req.user.id) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	await thisReview.destroy();

	return res.json({
		message: "Successfully deleted",
	});
});

module.exports = router;
