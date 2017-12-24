const express = require('express');
const Sequelize = require('sequelize');
const models = require('../db/models');
import ideaMethods from '../db/methods/ideaMethods';

const Op = Sequelize.Op;
const router = express.Router();

/**
 * @description List all ideas
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Object} ideas The array of ideas
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

/**
 * @description Retrieve all unique idea tags across all ideas
 * @returns {Object} tags A JSON object containing the unique tags in ascending sequence
 */
router.get('/ideas/getalltags', async (req, res) => {
  const tags = await models.Idea.findAll({
    attributes: [
      [models.sequelize.fn('UNNEST', models.sequelize.col('tags')),'tag'],
    ],
    distinct: true,
    order: [
      ['ideas.tag', 'ASC']
    ],
  });
  res.json(tags);
});

/**
 * @description Find ideas based on a list of tags and keywords. Each idea
 * to be returned to the caller must be categorized with at least one tag or
 * contain at least one keyword in either the title or description field.
 * Note that the keyword search requires a full text index on the title and
 * description fields of the idea collection.
 * @param {String} currUser The nickname of the currently logged on user
 * @param {String} searchForTabs A list of comma-separated unique tags
 * @param {String} searchForKeywords A list of comma-separated of unique keywords
 * @returns {Object} ideas A JSON object containing the resulting ideas, each described 
 * by its title, type, status, and status date
 */
router.get('/ideas/search/:currUser(*):searchForTags(*):searchForKeywords(*)', async (req, res) => {
  //Idea.searchIdeas(req.query.currUser, req.query.searchForTags, req.query.searchForKeywords)
  console.log('Route /ideas/search/:currUser(*):searchForTags(*):searchForKeywords(*) - req.query: ', req.query);
  const ideas = await models.Idea.findAll({
    where: {
      tags: { [Op.overlap]: [req.query.searchForTags] },
    },
  });
  console.log('Search results: ', ideas);
  res.json(ideas);
});
module.exports = router;
