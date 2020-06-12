const { Router } = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const assert = require('assert');
const jwt = require('jsonwebtoken');

const schema = require('./schema');

const router = Router();

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect((err) => {
  assert.equal(null, err);
  console.log('Successfully connected to the database from auth router');
});

router.get('/', (req, res) => {
  res.json({
    message: 'Auth route get',
  });
});

const validateSignUp = async (req, res, next) => {
  try {
    const error = await schema.validateAsync(req.body);
    if (error !== null) {
      next();
    }
  } catch (error) {
    res.status(400).json({ message: 'Error with username or password.'})
    next(new Error('Username or password does not match validation schema.'));
    
  }
};

const checkUniqueUser = async (req, res, next) => {
  const collection = client.db('acchord').collection('users');
  const { username } = req.body;
  const count = await collection.countDocuments({ username }, { limit: 1 });

  if (count === 0) {
    next();
  } else {
    res.status(400).json({ message: 'Username is taken.' });
    next(new Error('User not unique.'));
  }
};

router.post('/signup', validateSignUp, checkUniqueUser, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const userInfo = {
      username,
      hashedPassword,
    };

    const collection = client.db('acchord').collection('users');
    collection.insertOne(userInfo, (insertionErr) => {
      assert.equal(null, insertionErr);
      console.log('User information inserted into database');
      res.status(200).json('User created!');
    });
  } catch (err) {
    res.sendStatus(500);
    console.log(err.message);
  }
});

const checkUserExists = async (req, res, next) => {
  const collection = client.db('acchord').collection('users');
  const { username } = req.body;
  const count = await collection.countDocuments({ username }, { limit: 1 });

  if (count === 1) {
    next();
  } else {
    res.status(400).json({ message: 'User not found.' }); // change message?
    next(new Error('User does not exist in database.'));
  }
};

const validatePassword = async (req, res, next) => {
  const collection = client.db('acchord').collection('users');
  const { username, password } = req.body;
  const userDoc = await collection.findOne({username: username });

  if (bcrypt.compareSync(password, userDoc.hashedPassword)) {
    const payload = {
      username,
      _id: userDoc._id
    }
    res.locals.token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '1d'});
    next();
  } else {
    res.status(400).json({ message: 'Error with username or password.' });
    next(new Error('User entered the wrong password.'));
  }
};

router.post('/login', validateSignUp, checkUserExists, validatePassword, (req, res) => {
  res.status(200).json({
    message: 'User logged in!',
    token: res.locals.token,
  });
});

router.post('/token', (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.TOKEN_KEY);
    res.status(200).json('Token verified.');
  } catch (error) {
    res.status(401).json('Token unverified.');
  }
});

module.exports = router;
