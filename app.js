const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// setup application
app.use(bodyParser.json());

require('./config/routes')(app);

// start application
app.listen(8080, () => {
    console.log('Listening on port 8080!');
});
