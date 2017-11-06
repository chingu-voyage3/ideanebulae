import jwtDecode from 'jwt-decode';

// Receives a token and returns the object
// representation of the token, also known as
// decoding the token
const decodeToken = (token) => jwtDecode(token);

export default decodeToken;
