const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

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

module.exports = authCheck;
