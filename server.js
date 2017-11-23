import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
// default port where dev server listens for incoming traffic
var port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// The routes for the app
app.use('/api', router);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
