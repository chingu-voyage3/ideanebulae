import axios from 'axios';
import { getAccessToken } from '@/auth';

// Create http object to send the access token
// along with every single request
/* eslint-disable */
const port = process.env.PORT || 7000;
const apiURL = `http://localhost:${port}/api`;
console.log('API URL:', apiURL);
const http = new axios.create({
  baseURL: apiURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default http;
