const { Router } = require('express');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const router = Router();

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect((err) => {
  assert.equal(null, err);
  console.log('Successfully connected to the database from auth router');
  client.db('acchord').createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'password'],
        properties: {
          username: {
            bsonType: 'string',
            maxLength: 20,
            minLength: 3,
            description: 'must be a string and is required',
          },
          password: {
            bsonType: 'string',
            maxLength: 20,
            minLength: 8,
            description: 'must be a string and is required',
          },
        },
      },
    },
  });
});

router.get('/', (req, res) => {
  res.json({
    message: 'Auth route get',
  });
});

router.post('/signup', async (req, res) => {
  try {
    console.log('body', req.body);
    const db = client.db('acchord');
    const collection = db.collection('users');
    const { username, password } = req.body;
    const userInfo = {
      username,
      password,
    };

    const count = await collection.countDocuments({ username }, { limit: 1 });

    if (count === 0) {
      collection.insertOne(userInfo, (insertionErr) => {
        assert.equal(null, insertionErr);
        console.log('User information inserted into database');
        res.sendStatus(200);
      });
    } else {
      res.status(400).send('Username already taken');
    }
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
});

module.exports = router;
