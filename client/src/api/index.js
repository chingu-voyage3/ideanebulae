import axios from 'axios';
import { getAccessToken } from '@/auth';

// Create http object to send the access token
// along with every single request
/* eslint-disable */
console.log(`API_HOST: ${process.env.API_HOST} API_PORT: ${process.env.API_PORT}`);
const apiHost = (process.env.API_HOST) ? process.env.API_HOST : null;
const apiPort = (process.env.API_PORT) ? process.env.API_PORT : null;
console.log(`apiHost: ${apiHost} apiPort: ${apiPort}`);

let apiURL = '';
if (apiHost) {
  apiURL = (apiPort) ? `${apiHost}:${apiPort}` : apiHost;
} else {
  apiURL = 'http://localhost:7000/api';
}
console.log(`apiHost: ${apiHost} apiPort: ${apiPort} resulting apiURL: ${apiURL}`);
const http = new axios.create({
  baseURL: apiURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default http;
