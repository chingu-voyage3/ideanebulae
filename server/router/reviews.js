const express = require('express');
const models = require('../db/models');

const router = express.Router();

/**
 * @description Add a new reviewer to an idea document identified by the specified
 * creator, title, and type.
 * @param {String} ideaid - The idea's unique identier
 * @param {String} reviewerid - The reviewers profile id
 * @param {String} comments - Review comments
 * @returns {Object} If successfully updated the new row is returned.
 */
router.post('/review/:ideaid(*):reviewerid(*)', (req, res) => {
  models.Review.update({
    comments: req.body.comment,
  },
  {
    where: {    
      idea_id: req.query.ideaid, 
      reviewer_id: req.query.reviewerid, 
    },
  })
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.send(err)
  });
})
// Update an existing review in an dentified by the specified creator, title,
// and type.
/*
router.post('/review/:creator(*):title(*):type(*)', (req,res) => {
  models.review.update({
    comments: req.body.comment,
  },
  {
    where: {    
      idea_user_id: req.query.creator, 
      idea_title: req.query.title, 
      idea_type: req.query.type, 
      reviewer_id: req.body.reviewer, 
    },
  })
  .then(review => {
    res.json(review);
  })
  .catch(err => {
      res.send(err);
  });
});
*/

module.exports = router;
