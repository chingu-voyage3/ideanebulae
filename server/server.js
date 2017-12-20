const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./services/config');
const router = require('./router');
const models = require('./db/models');

const app = express();

// default port where dev server listens for incoming traffic
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// The routes for the app
app.use('/api', router);

models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });
});

