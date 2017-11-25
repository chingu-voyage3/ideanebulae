import axios from 'axios';
import { getAccessToken } from '@/auth';

// Create http object to send the access token
// along with every single request
// eslint-disable-next-line new-cap
const http = new axios.create({
  baseURL: process.env.API_HOST,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default http;
