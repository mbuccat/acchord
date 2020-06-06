const { Router } = require('express');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const router = Router();

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect((err) => {
  assert.equal(null, err);
  console.log('Successfully connected to the database');
  client.db('acchord').createCollection("reviews", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "mediaType", "mediaName", "mediaCreator", "content", "created" ],
          properties: {
            mediaType: {
              bsonType: "string",
              description: "must be a string and is required"
             },
            mediaName: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            mediaCreator: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            content: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            created: {
              bsonType: "date",
              description: "must be a date and is required"
            }
          }
       }
    }
  });
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
    const { mediaType, mediaName, mediaCreator, content } = req.body;
    const reviewData = {
      mediaType,
      mediaName,
      mediaCreator,
      content,
      created: new Date(),
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
