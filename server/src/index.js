const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const search = require('./api/search');
const reviews = require('./api/reviews');

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/api/search', search);
app.use('/api/reviews', reviews);

app.get('/*', (req, res) => {
  res.status(404);
  res.json({
    message: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
