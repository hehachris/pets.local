const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

// setup application
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.disable('x-powered-by');

require('./config/routes')(app);

// start application
app.listen(8080, () => {
    console.log('Listening on port 8080!');
});
