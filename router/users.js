const express = require('express');
const models = require('../db/models');

const router = express.Router();

/**
 * List all profiles
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The array of profiles
 */
router.get('/users', (req, res) => {
  models.Profile.findAll()
    .then((profiles) => {
      res.json(profiles);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * Return one profile based on the username
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} The profile found in the database
 */
router.get('/profile/:username(*)', (req, res) => {
  models.Profile.findOne({ where: { username: req.query.username } })
    .then((profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * Create/Update the user profile for the specified user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} The created/updated profile
 */
router.put('/profile/:userId(*)', (req, res) => {
  const { user_id, username, name, avatar_url, qualifications } = req.body;
  models.Profile.create({
    user_id,
    username,
    name,
    avatar_url,
    qualifications,
  })
    .then((profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
