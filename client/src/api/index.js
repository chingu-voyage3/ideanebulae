import axios from 'axios';
import { getAccessToken } from '@/auth';

// Create http object to send the access token
// along with every single request
/* eslint-disable */
const apiHost = (process.env.API_HOST) ? process.env.API_HOST : null;
const apiPort = (process.env.API_PORT) ? process.env.API_PORT : null;
const apiURL = '';
if (apiHost) {
  apiURL = (apiPort) ? `${apiHost}:${apiPort}` : apiHost;
} else {
  apiURL = `http://localhost:${port}/api`;
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
