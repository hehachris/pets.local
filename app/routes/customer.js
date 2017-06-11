const models = require('../models');
const petRepo = require('../repos/sequelize/pet');

module.exports = {
    getAll(req, res) {
        models.Customer.findAll({
            include: models.CustomerPreference
        }).then((customers) => {
            res.send(customers);
        });
    },
    getOne(req, res) {
        models.Customer.findById(req.params.customer_id, {
            include: models.CustomerPreference
        }).then((customer) => {
            if (!customer) {
                res.sendStatus(404);
            } else {
                res.send(customer);
            }
        });
    },
    getMatchedPets(req, res) {
        models.CustomerPreference.findById(req.params.customer_id).then((customerPreference) => {
            if (!customerPreference) {
                res.sendStatus(404);
            } else {
                petRepo.findMatchedPetsByCustomerPreference(customerPreference).then((pets) => {
                    res.send(pets);
                });
            }
        });
    },
    post(req, res) {
        models.Customer.create(
            {
                name: req.body.name,
                customer_preference: req.body.customer_preference || {}
            },
            {
                include: models.CustomerPreference
            }
        ).then((customer) => {
            res.status(201).send(customer);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }
};
