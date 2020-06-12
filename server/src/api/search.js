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

    res.status(200).json({
      message: 'Search received',
      jsonFromMusicApi: apiResponseJson,
    });
  } catch (error) {
    const message = error.message.includes('50')
      ? 'Please shorten your query.'
      : 'Please check your query.';
    res.status(400).json({
      message,
    });
  }
});

module.exports = router;
