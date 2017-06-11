const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// setup application
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.disable('x-powered-by');

require('./app/libs/sockets')(app, io);
require('./config/routes')(app);
require('./app/libs/errorHandler')(app);

// start application
server.listen(8080, () => {
    console.log('Listening on port 8080!');
});

module.exports = app;
