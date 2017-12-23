const express = require('express');
const models = require('../db/models');
import ideaMethods from '../db/methods/ideaMethods';

const router = express.Router();

/**
 * List all ideas
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object[]} The array of ideas
 */
router.get('/ideas', (req, res) => {
  ideaMethods.findAll()
    .then((ideas) => {
      res.json(ideas);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Retrieve all unique idea tags that are currently assigned to ideas
router.route('/ideas/getalltags')
.get((req, res) => {
    console.log('getalltags - No parameters');
    const tags = ideaMethods.getAllTags();
    console.log('getalltags - tags: ', tags);
    res.json(tags);
  });

module.exports = router;
