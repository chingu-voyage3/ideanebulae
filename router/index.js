import express, { Router } from 'express';
import mongoose from 'mongoose';
import config from '../services/mongoose.config';
import User from '../models/user';
import Idea from '../models/idea';
import authCheck from '../utils/authCheck';
import decodeToken from '../utils/decodeToken';

const router = Router();

mongoose.connect(config.db.mongoURI, {
  useMongoClient: true
});

// See http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library
mongoose.Promise = global.Promise;

// Example of route that implements authCheck
// only if you've been authenticated you can access
// inner functionality
router.get('/private', authCheck, (req, res) => {
  res.json('You must be authenticated to see this route');
});

// Returns a list of all the users
router.route('/users')
  .get((req, res) => {
    User.listUsers()
      .then(users => res.json(users))
      .catch(err => res.send(err));
  });

// Retrieve the user profile for the specified user name
router.get('/profile/:username(*)', (req, res) => {
  User.findUser(req.query.username)
  .then(user => {
    res.json(user);
  })
  .catch(err => res.send(err));
});

// Add or update the user profile for the specified user.
//router.put('/profile/:username(*)', authCheck, (req, res) => {
router.put('/profile/:userId(*)', (req, res) => {
  User.createOrUpdateUser(req.params.userId, req.body.profile)
  .then((doc) => {
    res.json('User profile created/updated');
  })
  .catch((err) => {
    console.log('Error: ', err);
    res.json(err);
  })
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

// Add a new reviewer to the idea document identified by the specified creator, title,
// and type.
router.route('/idea/addreviewer/:creator(*):title(*):type(*):review(*)')
.put((req, res) => {
  Idea.addIdeaReview(req.query.creator, req.query.title, req.query.type, req.query.review)
    .then(idea => {
      res.json(idea)
    })
    .catch(err => res.send(err));
});

// Update an existing review to the idea document identified by the specified creator,
// title, and type.
router.route('/idea/updatereview/:creator(*):title(*):type(*):review(*)')
.put((req, res) => {
  Idea.updateIdeaReview(req.query.creator, req.query.title, req.query.type, req.query.review)
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
// Retrieve all idea documents with no filtering
.get((req, res) => {
  Idea.listIdeas()
    .then(ideas => res.json(ideas))
    .catch(err => res.send(err));
})
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
    res.json(idea)
  })
  .catch(err => res.send(err));
});

// Retrieve all unique idea tags that are currently assigned to ideas
router.route('/ideas/getAllTags')
.get((req, res) => {
    Idea.getAllTags()
      .then(ideaTags => {
        res.json(ideaTags)
      })
      .catch(err => res.send(err));
  });
  
// Retrieve the idea documents matching the specified tags and keywords.
router.route('/ideas/search/:currUser(*):searchForTags(*):searchForKeywords(*)')
.get((req, res) => {
  Idea.searchIdeas(req.query.currUser, req.query.searchForTags, req.query.searchForKeywords)
    .then(ideas => {
      res.json(ideas)
    })
    .catch(err => res.send(err));
});

export default router;
