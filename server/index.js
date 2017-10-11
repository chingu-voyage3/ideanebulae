const path = require('path');
const express = require('express');
const apis = require('./apis/apis.js');

process.env.DIST_PATH = path.join(__dirname, '../dist');

const app = express();

apis(app);

app.use('/static', express.static(path.join(process.env.DIST_PATH, 'static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.env.DIST_PATH, 'index.html'));
});

module.exports = app;
