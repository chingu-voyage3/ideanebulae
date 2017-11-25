import axios from 'axios';
import { getAccessToken } from '@/auth';

// Create http object to send the access token
// along with every single request
/* eslint-disable */
const apiURL = 'http://ideanebulaeas.herokuapp.com/api';
const http = new axios.create({
  baseURL: apiURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default http;
