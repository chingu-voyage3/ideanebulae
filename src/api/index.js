import axios from 'axios';
import { getAccessToken } from '@/auth';

// Create http object to send the access token
// along with every single request
/* eslint-disable */
const http = new axios.create({
  baseURL: 'http://localhost/api',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default http;
