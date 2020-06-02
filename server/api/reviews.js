const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  try {
    res.send('Test');
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    res.send('Post received');
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
