const express = require('express');
const Sequelize = require('sequelize');
const models = require('../db/models');
const decodeToken = require('../utils/decodeToken');
const authCheck = require('../utils/authCheck');
import ideaMethods from '../db/methods/ideaMethods';
import agreementMethods from '../db/methods/agreementMethods';
import documentMethods from '../db/methods/documentMethods';
import reviewMethods from '../db/methods/reviewMethods';

const Op = Sequelize.Op;
const router = express.Router();

/**
 * @description Retrieve a specific idea 
 * @param {String} creator - Username of the ideas creator
 * @param {String} title - Title of the idea
 * @param {String} type - Type classification of the idea
 * @returns {Object} A JSON object containing the attributes of the idea, including
 * its associated agreement, supporting documents, and reviews.
 */
router.get('/idea/:creator(*):title(*):type(*)', (req, res) => {
  models.sequelize.query(
    `SELECT ideas.id, profiles.user_id, ideas.title, ideas.idea_type, \
            ideas.description, ideas.tags, ideas.created_at, ideas.updated_at \
       FROM ideas, \
            profiles \
      WHERE profiles.user_id = '${req.query.creator}' \
        AND ideas.title = '${req.query.title}' \
        AND ideas.idea_type = '${req.query.type}' \
        AND ideas.profile_id = profiles.id`,
    { 
      type: models.sequelize.QueryTypes.SELECT,
  })
  .then(idea => {
    // Retrieve any agreements, documents, and reviews associated with this idea and 
    // add them to the JSON object
    const agreementPromise = agreementMethods.findByIdea(idea[0].id);
    const documentsPromise = documentMethods.findByIdea(idea[0].id);
    const reviewsPromise = reviewMethods.findByIdea(idea[0].id);
    Promise.all([agreementPromise, documentsPromise, reviewsPromise])
    .then((promiseValues) => {
      let ideaJSON = {};
      ideaJSON.idea = idea[0];
      ideaJSON.idea.agreement = promiseValues[0];
      ideaJSON.idea.documents = promiseValues[1];
      ideaJSON.idea.reviews = promiseValues[2];
      console.log('ideaJSON: ', JSON.stringify(ideaJSON,null,2));
      res.json(ideaJSON);
    });
  })
  .catch(err => res.send(err));
});

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
  // TODO: The following Sequelize findAll results in an error of "TypeError: Cannot read property 'type' of undefined". 
  /*
  const tags = models.Idea.findAll({
    attributes: [
      [models.sequelize.fn('UNNEST', models.sequelize.col('tags')),'tagList'],
    ],
    distinct: true,
    order: [
      ['ideas.tagList', 'ASC']
    ],
  })
  */
  models.sequelize.query(
    `SELECT DISTINCT UNNEST(tags) as tag \
       FROM ideas \
       ORDER BY tag`,
    { 
      type: models.sequelize.QueryTypes.SELECT,
    })
  .then((tags) => {
    res.json(tags.map((tagName) => { return tagName.tag }));
  })
  .catch((err) => {
    console.log('Error encountered in /ideas/getalltags route. ', err);
  });
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
 * by its title, type, status, and status date. Also included are the associated
 * agreement, supporting documents, and reviews.
 */
router.get('/ideas/search/:currUser(*):searchForTags(*):searchForKeywords(*)', async (req, res) => {
  const tagList = req.query.searchForTags.split(',').map((currentTag) => {
    return `'${currentTag}'`;
  }).join(',');
  console.log('tagList: ', tagList);

  const keywordList = '\'%('.concat(req.query.searchForKeywords.split(',').map((currentKeyword) => {
    return `${currentKeyword}`;
  }).join('|'), ')%\'');
  console.log('keywordList: ', keywordList);
  
  let ideaPromises = [];
  let allIdeasJSON = [];
  
  // TODO: Due to the complexity of the Postgres fulltext indexing and search
  // option (FTS) a simpler solution employing the 'SIMILAR' operator is used 
  // until the FTS solution can be researched.
  models.sequelize.query(
    `SELECT DISTINCT ideas.id, profiles.user_id, ideas.title, ideas.description, \
            ideas.idea_type, ideas.profile_id, ideas.tags, ideas.created_at, \
            ideas.updated_at, \
            review_status.status AS status, \
            review_status.status_dt AS status_dt \
       FROM profiles, \
            ideas \
            LEFT OUTER JOIN (SELECT id, UNNEST(tags) AS sgat \
                               FROM ideas) AS tagged_ideas \
                                 ON ideas.id = tagged_ideas.id \
            LEFT OUTER JOIN review_status ON review_status.idea_id = ideas.id \
       WHERE profiles.id = ideas.profile_id \
         AND (   TRIM(tagged_ideas.sgat) IN (${tagList}) \
              OR LOWER(title) SIMILAR TO ${keywordList} \
              OR LOWER(description) SIMILAR TO ${keywordList} \
             ) \
       ORDER BY updated_at DESC`,
    { type: models.sequelize.QueryTypes.SELECT })
  .then(ideas => {
    ideas.forEach((idea) => {
      let ideaStatus = null;
      let ideaPromise = new Promise((resolve, reject) => {
        ideaStatus = ({resolve: resolve, reject: reject});
      });
      ideaPromises.push(ideaPromise);
      // Retrieve any agreements, documents, and reviews associated with this idea and 
      // add them to the JSON object
      const agreementPromise = agreementMethods.findByIdea(idea.id);
      const documentsPromise = documentMethods.findByIdea(idea.id);
      const reviewsPromise = reviewMethods.findByIdea(idea.id);
      Promise.all([agreementPromise, documentsPromise, reviewsPromise])
      .then((promiseValues) => {
        let ideaJSON = {};
        ideaJSON.idea = idea;
        const agreement = promiseValues[0];
        ideaJSON.idea.agreement = agreement[0];
        const documents = promiseValues[1];
        ideaJSON.idea.documents = documents;
        const reviews = promiseValues[2];
        ideaJSON.idea.reviews = reviews;
        allIdeasJSON.push(ideaJSON);
        ideaStatus.resolve(`Completed: ${idea.id}`);
      });
    });
    Promise.all(ideaPromises)
    .then(() => {
      res.json(allIdeasJSON);
    });
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

module.exports = router;
