const models = require('../models');
const customerRepo = require('../repos/sequelize/customer');
const customerPreferenceRepo = require('../repos/sequelize/customerPreference');
const petRepo = require('../repos/sequelize/pet');

module.exports = {
    getAll(req, res) {
        customerRepo.findAll({
            include: models.CustomerPreference
        }).then((customers) => {
            res.send(customers);
        });
    },
    getOne(req, res, next) {
        customerRepo.findById(req.params.customer_id, {
            include: models.CustomerPreference
        })
            .then((customer) => {
                if (!customer) {
                    throw new Error(404);
                }

                res.send(customer);
            })
            .catch((err) => {
                next(err);
            });
    },
    getMatchedPets(req, res, next) {
        customerPreferenceRepo.findById(req.params.customer_id)
            .then((customerPreference) => {
                if (!customerPreference) {
                    throw new Error(404);
                }

                return petRepo.findMatchedPetsByCustomerPreference(customerPreference);
            })
            .then((pets) => {
                res.send(pets);
            })
            .catch((err) => {
                next(err);
            });
    },
    post(req, res, next) {
        models.Customer.create({
            name: req.body.name,
            customer_preference: req.body.customer_preference || {}
        }, { include: models.CustomerPreference })
            .then((customer) => {
                res.status(201).send(customer);
            })
            .catch((err) => {
                next(err);
            });
    },
    adopt(req, res, next) {
        if (!req.query.pet_id) {
            throw new Error(404);
        }

        let thePet;

        models.sequelize.Promise.all([
            petRepo.findById(req.query.pet_id),
            customerRepo.findById(req.params.customer_id)
        ])
            .spread((pet, customer) => {
                if (!pet || !customer) {
                    throw new Error(404);
                }

                thePet = pet;

                return models.CustomerAdoption.create({
                    customer_id: customer.id,
                    pet_id: pet.id
                });
            })
            .then(() => thePet.update({ is_adopted: true }))
            .then(() => {
                res.status(201).send(thePet);
            })
            .catch((err) => {
                next(err);
            });
    }
};
