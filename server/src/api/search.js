const { Router } = require('express');

const router = Router();

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    res.json({
      message: 'Search received',
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
