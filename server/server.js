import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// The routes for the app
app.use('/api', router);

app.listen(7000, () => {
  console.log('The server is running on port 7000');
});
