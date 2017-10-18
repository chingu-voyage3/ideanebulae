import { getUserProfile } from './services/userProfile';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://.well-known/jwks.json',
  }),
  audience: 'API-AUDIENCE-ATTR',
  issuer: 'https://auth0-domain.auth0.com/',
  algorithms: ['RS256'],
});

app.get('/api/public', (req, res) => {
  let users = [
    {
      username: 'Trion',
      email: 'trion@ideanebulae.com',
    },
    {
      username: 'Chance',
      email: 'admin@chingu.io',
    },
  ];

  res.json(users);
});

app.get('/api/private', authCheck, (req, res) => {
  let message = {
    content: 'This is a private message!',
  };

  res.json(message);
});

/**
 * @description API Path: Retrieve a users profile from the database. The user id 
 * identifying the user whose profile is to be returned is embedded in the
 * request
 * @param Object req HTML Request object
 * @param Object res HTML Response object
 * @returns Object userProfile An object containting the user profile
 * information or null if no profile was found
 */
app.get('/api/profile/:userId(*)', (req, res) => {
  console.log(`server -> /api/profile GOT HERE`);
  const userId = request.params.userId;
  const userProfile = getUserProfile(userId);
  res.json(userProfile);
});

app.listen(7000);
console.log('The server is running on port 7000');
