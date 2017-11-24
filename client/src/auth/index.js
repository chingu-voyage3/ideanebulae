// import axios from 'axios';
import auth0 from 'auth0-js';
import Router from 'vue-router';
// import Auth0Lock from 'auth0-lock';

import { isTokenExpired } from './utils';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = '54kq1Kx1717k52deTJ55CUHzaq77fJQy';
const CLIENT_DOMAIN = 'ideanebulae.auth0.com';
// const REDIRECT = 'http://localhost:8080/callback';
const REDIRECT = `${window.location.protocol}//${window.location.hostname}/callback`;
console.log(`REDIRECT=${REDIRECT}`);
const SCOPE = 'openid profile';
const AUDIENCE = 'https://ideanebulae.auth0.com/api/v2/';

const auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN,
});

const router = new Router({
  mode: 'history',
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE,
  });
}

// Helper to extract the access token and id token
function getParameterByName(name) {
  // eslint-disable-next-line
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  // const match = RegExp(`[#&] ${name} =([^&]*)`).exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get the id token from the localStorage
export function getIdToken() {
  return window.localStorage.getItem(ID_TOKEN_KEY);
}

// Get the access token from the localStorage
export function getAccessToken() {
  console.log(`REDIRECT: ${REDIRECT}`);
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken() {
  const accessToken = getParameterByName('access_token');
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function setIdToken() {
  const idToken = getParameterByName('id_token');
  window.localStorage.setItem(ID_TOKEN_KEY, idToken);
}

// Remove the id token from the localStorage
export function clearIdToken() {
  window.localStorage.removeItem(ID_TOKEN_KEY);
}

// Remove the access token from the localStorage
export function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Check if there's a token and it's not expired
export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

// Logout the current user by deleting the tokens
export function logout() {
  clearIdToken();
  clearAccessToken();
  router.go('/');
}

// Middleware to check if the user is logged in
export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}

// eslint-disable-next-line
export function getUserProfile() {
  const accessToken = getAccessToken();

  if (accessToken) {
    return new Promise((resolve, reject) => {
      auth.client.userInfo(accessToken, (err, profile) => {
        // There was an error fetching the user profile
        // reject with the error
        if (err) {
          reject(err);
        }
        // We were able to fetch the user profile, resolve using it
        resolve(profile);
      });
    });
  }

  // There's no access token therefore we can't fetch the user
  // profile, return null then
  return null;
}
