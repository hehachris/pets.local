const models = require('../models');

module.exports = {
    getAll(req, res) {
        models.Pet.findAll().then((pets) => {
            res.send(pets);
        });
    }
};
