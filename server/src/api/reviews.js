const { Router } = require('express');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const router = Router();

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect((err) => {
  assert.equal(null, err);
  console.log('Successfully connected to the database');
});


router.get('/', (req, res) => {
  try {
    const db = client.db('acchord');
    const collection = db.collection('reviews');
    const cursor = collection.find();
    const results = [];

    cursor.forEach((doc, docErr) => {
      assert.equal(null, docErr);
      results.push(doc);
    }, () => {
      res.status(200);
      res.json({ results });
    });
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
});

router.post('/', (req, res) => {
  try {
    const db = client.db('acchord');
    const collection = db.collection('reviews');
    const { mediaType, mediaName, mediaCreator, content, created } = req.body;
    const reviewData = {
      mediaType,
      mediaName,
      mediaCreator,
      content,
      created,
    };

    collection.insertOne(reviewData, (insertionErr) => {
      assert.equal(null, insertionErr);
      console.log('Item inserted into database');
      res.sendStatus(200);
    });
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
});

module.exports = router;
