const { Router } = require('express');
const fetch = require('node-fetch');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const type = req.body.type;
    const query = req.body.query;
    const api_url = `https://api.deezer.com/search/${type}/?q=${query}&index=0&limit=5&output=json`

    const apiResponse = await fetch(api_url);
    const apiResponseJson = await apiResponse.json();

    res.status(200).json({
      message: 'Search received',
      data: apiResponseJson,
    });
  } catch (err) {
    console.log(err.message);
    res.send(500);
  }
});

module.exports = router;
