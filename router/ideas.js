const express = require('express');
const Sequelize = require('sequelize');
const models = require('../db/models');
const decodeToken = require('../utils/decodeToken');
const authCheck = require('../utils/authCheck');
import ideaMethods from '../db/methods/ideaMethods';
import agreementMethods from '../db/methods/agreementMethods';

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
 * @description Create a new idea
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @return {Object} idea The just created idea
 */
router.post('/ideas', authCheck, async (req, res) => {
  // First we get the token from the headers
  const token = req.headers['authorization'].slice(7);

  // Then we decode it and extract sub only
  const { sub } = decodeToken(token);

  const { title, description, typeCode, tags, documents } = req.body;

  // Handles the constants defined in the client
  // to set the correct value for the enum
  let idea_type;
  switch (typeCode) {
    case 'PUBLIC_IDEA':
      idea_type = 'public';
      break;
    case 'PRIVATE_IDEA':
      idea_type = 'private';
      break;
    case 'COMMERCIAL_IDEA':
      idea_type = 'commercial';
      break;
    default:
      break;
  }

  const profile = await models.Profile.findOne({ where: { user_id: sub } });

  // There's a profile for the JWT, we can create the idea
  if (profile) {
    const idea = await models.Idea.create({
      title,
      description,
      idea_type,
      profile_id: profile.id,
      tags,
    });
    documents.forEach((document) => {
      let { url, description, idea_title } = document;
      models.Document.create({
        url,
        description,
        idea_title,
        profile_id: profile.id,
        idea_id: idea.id,
      });
    });
    res.json(idea);
  }
  // No profile, good bye
  else {
    const err = {
      'message': 'There\'s no user for that token',
    };
    res.json(message);
  }
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
 *
 * @param {String} currUser The nickname of the currently logged on user
 * @param {String} searchForTabs A list of comma-separated unique tags
 * @param {String} searchForKeywords A list of comma-separated of unique keywords
 * @returns {Object} ideas A JSON object containing the resulting ideas, each described
 * by its title, type, status, and status date. Also
 */
router.get('/ideas/search/:currUser(*):searchForTags(*):searchForKeywords(*)', async (req, res) => {
  const tagList = req.query.searchForTags.split(',').map((currentTag) => {
    return `'${currentTag}'`;
  }).join(',');

  const keywordList = '\'%('.concat(req.query.searchForKeywords.split(',').map((currentKeyword) => {
    return `${currentKeyword}`;
  }).join('|'), ')%\'');
  
  // TODO: Due to the complexity of the Postgres fulltext indexing and search
  // option (FTS) a simpler solution employing the 'SIMILAR' operator is used 
  // until the FTS solution can be researched.
  models.sequelize.query(
    `SELECT DISTINCT ideas.id, ideas.title, ideas.description, ideas.idea_type, \
            ideas.profile_id, ideas.tags, ideas.created_at, ideas.updated_at, \
            review_status.status AS status, review_status.status_dt AS status_dt, \
            review_status.status AS status, \
            review_status.status_dt AS status_dt \
       FROM ideas, \
            (SELECT id, UNNEST(tags) AS sgat FROM ideas) AS tagged_ideas, \
            review_status \
       WHERE ideas.id = tagged_ideas.id \
         AND review_status.idea_id = ideas.id \
         AND (   trim(tagged_ideas.sgat) IN (${tagList}) \
              OR lower(title) SIMILAR TO ${keywordList} \
              OR lower(description) SIMILAR TO ${keywordList} ) \
       ORDER BY updated_at DESC`,
    { type: models.sequelize.QueryTypes.SELECT})
  .then(ideas => {
    console.log('Search results: ', ideas);
    console.log('ideas.id: ', ideas[0].id);
    // Retrieve any agreements associated with this idea
    agreementMethods.findByIdea(ideas[0].id)
    .then((agreements) => {
      console.log('agreements: ', agreements);
    });
    // Retrieve any documents associated with this idea
    // Retrieve any reviews associated with this idea
    res.json(ideas);
  })
});
module.exports = router;
