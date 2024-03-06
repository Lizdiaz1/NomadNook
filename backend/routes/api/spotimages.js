const express = require("express");

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

router.delete("/:imageId", requireAuth, async (req, res) => {
	const userId = req.user.id;

	const imageId = req.params.imageId;

	const currImg = await SpotImage.findByPk(imageId, {
		include: {
			model: Spot,
		},
	});

	if (!currImg) {
		res.status(404);
		return res.json({
			message: "Spot Image couldn't be found",
		});
	}

	if (currImg.Spot.ownerId !== userId) {
		res.status(403);
		return res.json({
			message: "Forbidden",
		});
	}

	await currImg.destroy();

	res.json({
		message: "Successfully deleted",
	});
});

module.exports = router;
