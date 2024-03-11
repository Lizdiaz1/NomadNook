"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const { SpotImage, sequelize } = require("../models");


// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert('SpotImages', [
// 			{
// 				url: "https://tjbprivatetravel.com/wp-content/uploads/2022/05/chalet-evening-lit-up-looking-towards-tasch-1-scaled.jpg",
// 				spotId: 1,
// 				preview: true,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://ariajourneys.com/wp-content/uploads/2017/01/luxury_ski_holidays_Zermatt_120.jpg",
// 				spotId: 1,
// 				preview: false,
// 				createdAt: new Date(),
//        			updatedAt: new Date()
// 			},
// 			{
// 				url: "https://www.chaletzermattpeak.com/media/45257/1-welcome-drinks-winter.jpg",
// 				spotId: 1,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://i.insider.com/4eb822ed6bb3f76e0300000a?width=750&format=jpeg&auto=webp",
// 				spotId: 1,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://a0.muscache.com/im/pictures/9f6f2463-2b25-492c-b9aa-f2ee4a508c6a.jpg?im_w=720",
// 				spotId: 3,
// 				preview: true,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://www.spinsheet.com/images/CPLH%20Keepers%20House.jpg",
// 				spotId: 3,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://a0.muscache.com/pictures/29f60772-f09d-4ea5-a807-a243d44237f4.jpg",
// 				spotId: 3,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://www.calvertmarinemuseum.com/ImageRepository/Document?documentID=147",
// 				spotId: 3,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://i.pinimg.com/originals/9a/fb/12/9afb12c20cf4cb2ccf6a01ef9aec2fec.jpg",
// 				spotId: 3,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 						{
// 				url: "https://static.wikia.nocookie.net/narnia/images/6/6e/Wardrobe.jpg",
// 				spotId: 2,
// 				preview: true,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://www.narniaweb.com/wp-content/uploads/2020/11/pevensies-return-screenshot-1024x576.jpg",
// 				spotId: 2,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://i0.wp.com/streamondemandathome.com/wp-content/uploads/2016/11/Chronicles-Lion.jpg?fit=1000%2C563&ssl=1&w=640",
// 				spotId: 2,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 						{
// 				url: "https://ktla.com/wp-content/uploads/sites/4/2023/01/Disney-100-castle.jpg?strip=1",
// 				spotId: 4,
// 				preview: true,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://www.desertsun.com/gcdn/presto/2021/04/28/PPAS/fe10302a-cb83-4ca8-a70c-905eba2fb38b-Castle_relighting.jpg",
// 				spotId: 4,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://ewscripps.brightspotcdn.com/dims4/default/18fd88c/2147483647/strip/true/crop/9035x5082+0+444/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F14%2F78%2Fd870d423446c9dea277104e1d8e2%2Fd23expo2022-dlr-wondrousjourneys.JPG",
// 				spotId: 4,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://media.timeout.com/images/105560774/750/422/image.jpg",
// 				spotId: 4,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 			{
// 				url: "https://pbs.twimg.com/media/E2LgbsUWYAs7Byo.jpg",
// 				spotId: 4,
// 				preview: false,
// 				createdAt: new Date(),
//         		updatedAt: new Date()
// 			},
// 		]);
// 	},

// 	async down(queryInterface, Sequelize) {
// 		await queryInterface.bulkDelete('SpotImages', null, {});
// 	  }
// };



module.exports = {
	async up() {
	  const spotImages = [
		{
			url: "https://tjbprivatetravel.com/wp-content/uploads/2022/05/chalet-evening-lit-up-looking-towards-tasch-1-scaled.jpg",
			spotId: 1,
			preview: true,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://ariajourneys.com/wp-content/uploads/2017/01/luxury_ski_holidays_Zermatt_120.jpg",
			spotId: 1,
			preview: false,
			createdAt: new Date(),
			   updatedAt: new Date()
		},
		{
			url: "https://www.chaletzermattpeak.com/media/45257/1-welcome-drinks-winter.jpg",
			spotId: 1,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://i.insider.com/4eb822ed6bb3f76e0300000a?width=750&format=jpeg&auto=webp",
			spotId: 1,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://a0.muscache.com/im/pictures/9f6f2463-2b25-492c-b9aa-f2ee4a508c6a.jpg?im_w=720",
			spotId: 3,
			preview: true,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://www.spinsheet.com/images/CPLH%20Keepers%20House.jpg",
			spotId: 3,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://a0.muscache.com/pictures/29f60772-f09d-4ea5-a807-a243d44237f4.jpg",
			spotId: 3,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://www.calvertmarinemuseum.com/ImageRepository/Document?documentID=147",
			spotId: 3,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://i.pinimg.com/originals/9a/fb/12/9afb12c20cf4cb2ccf6a01ef9aec2fec.jpg",
			spotId: 3,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
					{
			url: "https://static.wikia.nocookie.net/narnia/images/6/6e/Wardrobe.jpg",
			spotId: 2,
			preview: true,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://www.narniaweb.com/wp-content/uploads/2020/11/pevensies-return-screenshot-1024x576.jpg",
			spotId: 2,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://i0.wp.com/streamondemandathome.com/wp-content/uploads/2016/11/Chronicles-Lion.jpg?fit=1000%2C563&ssl=1&w=640",
			spotId: 2,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
					{
			url: "https://ktla.com/wp-content/uploads/sites/4/2023/01/Disney-100-castle.jpg?strip=1",
			spotId: 4,
			preview: true,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://www.desertsun.com/gcdn/presto/2021/04/28/PPAS/fe10302a-cb83-4ca8-a70c-905eba2fb38b-Castle_relighting.jpg",
			spotId: 4,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://ewscripps.brightspotcdn.com/dims4/default/18fd88c/2147483647/strip/true/crop/9035x5082+0+444/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F14%2F78%2Fd870d423446c9dea277104e1d8e2%2Fd23expo2022-dlr-wondrousjourneys.JPG",
			spotId: 4,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://media.timeout.com/images/105560774/750/422/image.jpg",
			spotId: 4,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			url: "https://pbs.twimg.com/media/E2LgbsUWYAs7Byo.jpg",
			spotId: 4,
			preview: false,
			createdAt: new Date(),
			updatedAt: new Date()
		},
	  ];

	  try {
		await SpotImage.bulkCreate(spotImages, { validate: true });
	  } catch (error) {
		console.error('Error seeding SpotImages:', error);
	  }
	},

	async down(queryInterface, Sequelize) {
	  try {

		await SpotImage.destroy({
		  where: {},
		  truncate: true
		});
	  } catch (error) {
		console.error('Error reverting SpotImages seed:', error);
	  }
	},
  };
