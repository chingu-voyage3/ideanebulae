const express = require('express');
const models = require('../db/models');

const router = express.Router();

/**
 * @description Add a new reviewer to an idea document identified by the specified
 * creator, title, and type.
 * @param {Integer} req.query.ideaid - The idea's unique identier
 * @param {String} req.query.reviewername - The reviewers user name
 * @param {Integer} req.body.idea_profile_id - Profile id of the idea creator
 * @param {String} req.body.idea_type - Type of the idea
 * @param {String} req.body.idea_title - The title of the idea
 * @param {String} req.body.comments - Review comments
 * @returns {Object} If successfully updated the new row is returned.
 */
router.post(':ideaid(*):reviewername(*)', (req,res) => {
  models.Profile.findOne(
    {
      where: {user_id: req.query.reviewername},
    }
  )
  .then((profile) => {
    models.Review.create({
      idea_id: req.query.ideaid,
      reviewer_id: profile.id,
      comments: req.body.comment,
    })
    .then(review => {
      res.json(review);
    })
    .catch(err => {
        res.send(err);
    });
  })
  .catch(err => {
    res.send(err);
  });
});

/**
 * @description Update an existing review.
 * @param {Integer} req.query.ideaid - The idea's unique identier
 * @param {Integer} req.query.reviewerid - The reviewers profile id
 * @param {String} req.body.comments - Review comments
 * @returns {Object} If successfully updated the new row is returned.
 */
router.put('/review/:ideaid(*):reviewerid(*)', (req, res) => {
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

module.exports = router;
