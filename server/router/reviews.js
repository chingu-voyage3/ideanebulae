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
router.put(':ideaid(*):reviewerid(*)', (req,res) => {
  models.Review.create({
    idea_id: req.query.ideaid,
    idea_profile_id: req.body.idea_profile_id,
    idea_type: req.body.idea_type,
    idea_title: req.body.idea_title,
    reviewer_id: req.query.reviewerid,
    comments: req.body.comment,
  })
  .then(review => {
    res.json(review);
  })
  .catch(err => {
      res.send(err);
  });
});

module.exports = router;
