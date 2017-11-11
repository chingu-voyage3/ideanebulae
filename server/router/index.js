import express, { Router } from 'express';
import mongoose from 'mongoose';
import config from '../services/mongoose.config';
import User from '../models/user';
import Idea from '../models/idea';
import authCheck from '../utils/authCheck';

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

// Add a new review to the idea document identified by the specified creator, title, and type.
// TODO: Change get to put
router.route('/idea/addreviewer/:creator(*):title(*):type(*):reviewer(*)')
.get((req, res) => {
  console.log('router - req.params: ', req.params);  
  Idea.addIdeaReviewer(req.params.creator, req.params.title, req.params.type, req.params.reviewer)
    .then(idea => {
      res.json(idea)
    })
    .catch(err => res.send(err));
});

// TODO: Consolidate all idea routes here
router.route('/ideas')
  // Retrieve all idea documents with no filtering
  .get((req, res) => {
    Idea.listIdeas()
      .then(ideas => res.json(ideas))
      .catch(err => res.send(err));
  })
  // Add or update an idea document
  .post((req, res) => {
    Idea.saveIdea(req.body)
      .then(() => {
        res.json('Idea created');
      })
      .catch(err => {
        res.send(err);
      });
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

// Retrieve all unique idea tags that are currently assigned to ideas  
router.route('/ideas/getAllTags')
  .get((req, res) => {
    Idea.getAllTags()
      .then(ideaTags => {
        res.json(ideaTags)
      })
      .catch(err => res.send(err));
  });

export default router;
