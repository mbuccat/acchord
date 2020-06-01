const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(helmet());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/*', (req, res) => {
    res.status(404);
    res.send('Page not found');
})

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});