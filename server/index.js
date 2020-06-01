const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(helmet());

app.get('/', (request, response) => {
    response.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});