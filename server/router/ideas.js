const express = require('express');
const models = require('../db/models');

const router = express.Router();

/**
 * List all ideas
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object[]} The array of ideas
 */
router.get('/ideas', (req, res) => {
  models.Idea.findAll()
    .then((ideas) => {
      res.json(ideas);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
