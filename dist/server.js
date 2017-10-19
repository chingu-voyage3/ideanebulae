'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://.well-known/jwks.json'
  }),
  audience: 'API-AUDIENCE-ATTR',
  issuer: 'https://auth0-domain.auth0.com/',
  algorithms: ['RS256']
});

app.get('/api/public', function (req, res) {
  var users = [{
    username: 'Trion',
    email: 'trion@ideanebulae.com'
  }, {
    username: 'Chance',
    email: 'admin@chingu.io'
  }];

  res.json(users);
});

app.get('/api/private', authCheck, function (req, res) {
  var message = {
    content: 'This is a private message!'
  };

  res.json(message);
});

app.listen(7000);
console.log('The server is running on port 7000');