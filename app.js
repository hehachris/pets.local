const express = require('express');

const app = express();

require('./config/routes')(app);

// start application
app.listen(8080, () => {
    console.log('Listening on port 8080!');
});
