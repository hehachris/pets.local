const _ = require('lodash');

const customerRepo = require('../repos/sequelize/customer');
const models = require('../models');

module.exports = {
    getAll(req, res) {
        models.Pet.findAll()
            .then((pets) => {
                res.send(pets);
            });
    },
    getOne(req, res, next) {
        models.Pet.findById(req.params.pet_id)
            .then((pet) => {
                if (!pet) {
                    throw new Error(404);
                }

                res.send(pet);
            })
            .catch((err) => {
                next(err);
            });
    },
    getMatchedCustomers(req, res, next) {
        models.Pet.findById(req.params.pet_id)
            .then((pet) => {
                if (!pet) {
                    throw new Error(404);
                }

                return customerRepo.findMatchedCustomersByPet(pet);
            })
            .then((customers) => {
                res.send(customers);
            })
            .catch((err) => {
                next(err);
            });
    },
    post(req, res, next) {
        let thePet;

        models.Pet.create({
            name: req.body.name,
            available_from: req.body.available_from,
            age: req.body.age,
            species: req.body.species,
            breed: req.body.breed || null,
        })
            .then((pet) => {
                thePet = pet;
                res.status(201).send(pet);
                return customerRepo.findMatchedCustomersByPet(pet);
            })
            .then((matchedCustomers) => {
                _.map(matchedCustomers, 'id').forEach((customerId) => {
                    req.sockets[customerId].emit('pet.matched', {
                        pet: thePet
                    });
                });
            })
            .catch((err) => {
                next(err);
            });
    }
};
