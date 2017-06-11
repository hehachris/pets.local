module.exports = (app) => {
    // Custom error handler
    app.use((err, req, res, next) => { // eslint-disable-line
        switch (err.message) {
            case '404':
                res.status(404).send('Object Not Found');
                break;

            case '400':
                res.status(400).send('Bad Request');
                break;

            default:
                console.error(err.stack);
                res.status(500).send(err);
        }
    });
};
