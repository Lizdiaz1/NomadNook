const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const bookingRouter = require('./bookings.js')
const spotImagesRouter = require('./spotimages.js')
const reviewImagesRouter = require('./reviewimages.js')

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.use('/reviews', reviewsRouter)

router.use('/bookings', bookingRouter)

router.use('/review-Images', reviewImagesRouter)

router.use('/spot-images', spotImagesRouter)


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

router.use(restoreUser);

module.exports = router;
