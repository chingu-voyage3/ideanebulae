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

// Gets the data of an user
// based on the userId param
router.route('/profile/:userId(*)')
  .get((req, res) => {
    User.findUser(req.query.userId)
      .then(user => res.json(user))
      .catch(err => res.send(err));
  });

// Update the data for a given user
router.route('/profile/:currId(*):userProfile(*)')  
  .put((req, res) => {    
    User.createOrUpdateUser(req.query.currId, req.query.userProfile)
      .then((doc) => {
        console.log('User profile created/updated\n...', doc);
        res.json('User profile created/updated');
      })
      .catch(err => {
        console.error(err);
        res.send(err);
      });
  });

router.route('/ideas')
  .get((req, res) => {
    Idea.listIdeas()
      .then(ideas => res.json(ideas))
      .catch(err => res.send(err));
  })
  .post((req, res) => {
    Idea.saveIdea(req.body)
      .then(() => {
        console.log('Idea created');
        res.json('Idea created');
      })
      .catch(err => {
        console.error(err);
        res.send(err);
      });
  })

export default router;
