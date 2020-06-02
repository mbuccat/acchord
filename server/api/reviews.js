const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  try {
    res.json({
      message: 'Test',
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    res.json({
      message: 'Post received',
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
