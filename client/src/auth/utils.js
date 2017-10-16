import decode from 'jwt-decode';

// Return the token expiration date in UTC
export function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) return null;
  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

// Check if the token has expired already
export function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
