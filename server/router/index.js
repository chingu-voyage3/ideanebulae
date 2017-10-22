import express, { Router } from 'express';
import User from '../models/user';
import Idea from '../models/idea';
import { listUsers, findUser } from '../services/userService';
import { listIdeas, findIdea, saveIdea } from '../services/ideaService';
import authCheck from '../utils/authCheck';

const router = Router();

// Example of route that implements authCheck
// only if you've been authenticated you can access
// inner functionality
router.get('/private', authCheck, (req, res) => {
  res.json('You must be authenticated to see this route');
});

// Returns a list of all the users
router.route('/users')
  .get((req, res) => {
    listUsers()
      .then(users => res.json(users))
      .catch(err => res.send(err));
  });

// Gets the data of an user
// based on the userId param
router.route('/profile/:userId(*)')
  .get((req, res) => {
    findUser(req.params.userId)
      .then(user => res.json(user))
      .catch(err => res.send(err));
  });

router.route('/ideas')
  .get((req, res) => {
    listIdeas()
      .then(ideas => res.json(ideas))
      .catch(err => res.send(err));
  })
  .post((req, res) => {
    saveIdea(req.body)
      .then(() => res.json('Idea created'))
      .catch(err => res.send(err));
  })

export default router;
