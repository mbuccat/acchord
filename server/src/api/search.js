const { Router } = require('express');
const fetch = require('node-fetch');
const { querySchema } = require('./schema');
const { validateToken } = require('../auth/index');

const router = Router();

router.post('/', validateToken, async (req, res) => {
  try {
    const { mediaType } = req.body;
    const { error } = querySchema.validate(req.body.query);

    if (error !== undefined) {
      throw new Error(error);
    }

    const query = encodeURI(req.body.query);
    const apiUrl = `https://api.deezer.com/search/${mediaType}/?q=${query}&index=0&limit=5&output=json`;

    const apiResponse = await fetch(apiUrl);
    const apiResponseJson = await apiResponse.json();

    if (apiResponseJson.error) {
      throw new Error('Results from Deezer returned an error.');
    }

    res.status(200).json({
      message: 'Search received',
      jsonFromMusicApi: apiResponseJson,
    });
  } catch (error) {
    const response = error.message.includes('ValidationError')
      ? res.status(400).json({ message: 'Please check your query.' })
      : res.status(500).json({ message: 'Unable to perform search.' });
  }
});

module.exports = router;
