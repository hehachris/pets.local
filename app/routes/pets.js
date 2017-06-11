const customerRepo = require('../repos/sequelize/customer');
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
    },
    getMatchedCustomers(req, res) {
        models.Pet.findById(req.params.pet_id).then((pet) => {
            if (!pet) {
                res.sendStatus(404);
            } else {
                customerRepo.findMatchedCustomersByPet(pet).then((customers) => {
                    res.send(customers);
                });
            }
        });
    },
    post(req, res) {
        models.Pet.create({
            name: req.body.name,
            available_from: req.body.available_from,
            age: req.body.age,
            species: req.body.species,
            breed: req.body.breed || null,
        }).then((pet) => {
            res.status(201).send(pet);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }
};
