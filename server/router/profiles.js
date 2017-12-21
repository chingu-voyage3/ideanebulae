const express = require('express');
const models = require('../db/models');

const router = express.Router();

/**
 * List all profiles
 * @param {object} req - The request object
 * @param {object} res - The response object to write to
 * @return {object[]} The array of profiles
 */
router.get('/profiles', async (req, res) => {
  const profiles = await models.Profile.findAll();
  res.json(profiles);
});

/**
 * Return one profile based on the username
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} The profile found in the database
 */
router.get('/profile/:username(*)', (req, res) => {
  models.Profile.findOne({ where: { username: req.params.username } })
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
  /**
   * First we need to check if there's a profile for the given user_id
   * if that's the case, we only want to update the rest of the fields
   * however if it doesn't exist, we want to create one
   */

  models.Profile.findOne({ where: { user_id } })
    .then((profile) => {
      if (profile) {
        profile.update({
          username,
          name,
          avatar_url,
          qualifications,
        })
          .then((updatedProfile) => {
            res.json(updatedProfile);
          })
          .catch((err) => {
            res.json(err);
          });
      }
      else {
        models.Profile.create({
          user_id,
          username,
          name,
          avatar_url,
          qualifications,
        })
          .then((createdProfile) => {
            res.json(createdProfile);
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
