const express = require('express');
const authCheck = require('../utils/authCheck');
const decodeToken = require('../utils/decodeToken');
const ideasRouter = require('./ideas');
const profilesRouter = require('./profiles');

const router = express.Router();

router.use(ideasRouter);
router.use(profilesRouter);
/**
 * IMPORTANT
 * DO NOT UNCOMMENT THESE ROUTES UNTIL THE ENDPOINTS
 * HAVE BEEN PORTED TO SEQUELIZE, FOR SOME WEIRD
 * REASON, THEY'RE COLLIDING AND CRASH THE SERVER
 */

/*

 // ----------------------------------------------------------------------------
// Idea Routes
// ----------------------------------------------------------------------------

// Retrieve the idea document identified by the specified creator, title, and type.
router.route('/idea/:creator(*):title(*):type(*)')
.get((req, res) => {
  Idea.findIdea(req.query.creator, req.query.title, req.query.type)
    .then(idea => {
      res.json(idea)
    })
    .catch(err => res.send(err));
});

// Retrieve the idea document identified by the specified creator, title, and type.
router.route('/idea/:creator(*):title(*):type(*)')
  .get((req, res) => {
    Idea.findIdea(req.query.creator, req.query.title, req.query.type)
      .then(idea => {
        res.json(idea)
      })
      .catch(err => res.send(err));
  });

router.route('/ideas')
// Add or update an idea document
.post((req, res) => {
  // When saving an idea we also need to find the user
  // who is trying to create it, so we can stablish the
  // relation using the user _id in the idea object
  // by doing so, we can then use populate() to get the
  // idea with the user as well

  // First we get the token from the headers
  let token = req.headers['authorization'].slice(7);

  // Then we decode it and extract sub only
  let { sub } = decodeToken(token);

  // Now we try to find a using with a matching sub or user_id
  User.findUserBySub(sub)
    // If there's an user, we can use its _id to create the idea
    .then((user) => {
      Idea.saveIdea(req.body, user.user_id)
        .then(idea => {
          console.log('Idea created');
          res.json('Idea created');
        })
        .catch((err) => {
          console.error(err);
          res.send(err)
        })
    })
    // There's no user, don't do anything
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
})
// Update an idea
.put((req, res) => {
  Idea.updateIdea(req.body.origCreator, req.body.origTitle, req.body.origType, req.body.newIdea)
  .then(idea => {
    console.log('Idea Updated ', idea);
    res.json(idea);
  })
  .catch(err => res.send(err));
})
// Delete an idea
.delete((req, res) => {
  Idea.deleteIdea(req.query.ideaId)
  .then(idea => {
    console.log('Idea Deleted ', idea);
    res.json(idea);
  })
  .catch(err => res.send(err));
});

// Retrieve all unique idea tags that are currently assigned to ideas
router.route('/ideas/getAllTags')
.get((req, res) => {
    Idea.getAllTags()
      .then(ideaTags => {
        res.json(ideaTags);
      })
      .catch(err => res.send(err));
  });

// Retrieve the idea documents matching the specified tags and keywords.
router.route('/ideas/search/:currUser(*):searchForTags(*):searchForKeywords(*)')
.get((req, res) => {
  Idea.searchIdeas(req.query.currUser, req.query.searchForTags, req.query.searchForKeywords)
    .then(ideas => {
      res.json(ideas);
    })
    .catch(err => res.send(err));
});

// ----------------------------------------------------------------------------
// Review Routes
// ----------------------------------------------------------------------------

router.route('/review/:creator(*):title(*):type(*)')
// Add a new reviewer to an idea document identified by the specified creator, title,
// and type.
.put((req, res) => {
  Idea.addReview(req.query.creator, req.query.title, req.query.type, req.body.reviewer, req.body.comment)
    .then(idea => {
      res.json(idea)
    })
    .catch(err => {
      res.send(err)
    });
})
// Update an existing review in an dentified by the specified creator, title,
// and type.
.post((req,res) => {
  Idea.updateReview(req.query.creator, req.query.title, req.query.type, req.body.reviewer, req.body.comment)
    .then(idea => {
      res.json(idea)
    })
    .catch(err => {
      res.send(err);
    });
});
*/

module.exports = router;
