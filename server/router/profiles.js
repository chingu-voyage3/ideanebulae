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
router.get('/profile/:username(*)', async (req, res) => {
  const { username } = req.params;
  const profile = await models.Profile.findOne({ where: { username } });
  res.json(profile);
});

/**
 * Create/Update the user profile for the specified user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} The created/updated profile
 */
router.put('/profile/:userId(*)', async (req, res) => {
  const { user_id, username, name, avatar_url, qualifications } = req.body;
  /**
   * First we need to check if there's a profile for the given user_id
   * if that's the case, we only want to update the rest of the fields
   * however if it doesn't exist, we want to create one
   */

  const profile = await models.Profile.findOne({ where: { user_id } });

  // We found a profile, therefore we need to update it
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
  // We didn't find a profile, so it's time to create one
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
});

module.exports = router;
