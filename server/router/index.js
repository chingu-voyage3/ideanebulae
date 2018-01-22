const express = require('express');
const authCheck = require('../utils/authCheck');
const decodeToken = require('../utils/decodeToken');
const ideasRouter = require('./ideas');
const profilesRouter = require('./profiles');
const reviewsRouter = require('./reviews');

const router = express.Router();

router.use(ideasRouter);
router.use(profilesRouter);
router.use(reviewsRouter);

module.exports = router;
