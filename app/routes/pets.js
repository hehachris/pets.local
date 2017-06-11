const models = require('../models');

module.exports = {
    getAll(req, res) {
        models.Pet.findAll().then((pets) => {
            res.send(pets);
        });
    },
    getOne(req, res) {
        models.Pet.findById(req.params.pet_id).then((pet) => {
            if (!pet) {
                res.sendStatus(404);
            } else {
                res.send(pet);
            }
        });
    }
};
