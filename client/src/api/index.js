import axios from 'axios';
import { getAccessToken } from '@/auth';

// Create http object to send the access token
// along with every single request
/* eslint-disable */

// TODO: Determine why the following doesn't work. The only variable in process.env
// is NODE_ENV. All other config variables are undefined.
/*
console.log('API_HOST: ', process.env.API_HOST, ' API_PORT: ',process.env.API_PORT);
const apiHost = process.env.API_HOST;
const apiPort = (process.env.API_PORT) ? process.env.API_PORT : null;
console.log(`apiHost: ${apiHost} apiPort: ${apiPort}`);
console.log('process.env: ', process.env);
let apiURL = '';
if (apiHost) {
  apiURL = (apiPort) ? `${apiHost}:${apiPort}` : apiHost;
} else {
  apiURL = 'http://localhost:7000/api';
}
console.log(`apiHost: ${apiHost} apiPort: ${apiPort} resulting apiURL: ${apiURL}`);
*/

const apiURL = 'http://ideanebulae.herokuapp.com';
const http = new axios.create({
  baseURL: apiURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default http;
