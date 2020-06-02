const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/*', (req, res) => {
    res.status(404);
    res.send('Page not found');
})

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});