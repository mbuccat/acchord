const { Router } = require('express');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const { reviewSchema } = require('./schema');
const { validateToken } = require('../auth/index');

const router = Router();

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect((err) => {
  assert.equal(null, err);
  console.log('Successfully connected to the database');
  client.db('acchord').createCollection('reviews', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['mediaType', 'mediaName', 'mediaCreator', 'content', 'created'],
        properties: {
          mediaType: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          mediaName: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          mediaCreator: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          content: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          created: {
            bsonType: 'date',
            description: 'must be a date and is required',
          },
        },
      },
    },
  });
});

router.get('/', (req, res) => {
  try {
    const db = client.db('acchord');
    const collection = db.collection('reviews');
    const cursor = collection.find();
    const reviews = [];

    cursor.forEach((doc, docErr) => {
      assert.equal(null, docErr);
      reviews.push(doc);
    }, () => {
      res.status(200);
      res.json({ reviews });
    });
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
});

// router.post('/', validateToken, (req, res) => {
//   try {
//     const db = client.db('acchord');
//     const collection = db.collection('reviews');
//     const {
//       mediaType, mediaName, mediaCreator, content,
//     } = req.body;
//     const { error } = reviewSchema.validate({
//       mediaType, mediaName, mediaCreator, content,
//     });

//     if (error === undefined) {
//       const reviewData = {
//         mediaType,
//         mediaName,
//         mediaCreator,
//         content,
//         created: new Date(),
//       };

//       collection.insertOne(reviewData, (insertionErr) => {
//         assert.equal(null, insertionErr);
//         console.log('Item inserted into database');
//         res.status(200).json({
//           message: 'Review posted!',
//         });
//       });
//     } else {
//       throw new Error(error);
//     }
//   } catch (error) {
//     const message = error.message.includes('1000')
//       ? 'Please shorten your review to 1000 characters or less.'
//       : 'Review could not be posted.';
//     res.status(400).json({
//       message,
//     });
//     console.log(error.message);
//   }
// });

module.exports = router;
