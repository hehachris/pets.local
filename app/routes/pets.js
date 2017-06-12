const _ = require('lodash');
const Geo = require('geo-nearby');

const customerRepo = require('../repos/sequelize/customer');
const petRepo = require('../repos/sequelize/pet');
const models = require('../models');
const socketStore = require('../libs/socketStore/native');

module.exports = {
    getAll(req, res) {
        let queryPromise;

        if (req.query.latitude && req.query.longitude) {
            const km = req.query.km || 2;
            queryPromise = petRepo.findNearby(req.query.latitude, req.query.longitude, km);
        } else {
            queryPromise = petRepo.findAll();
        }

        queryPromise.then((pets) => {
            res.send(pets);
        });
    },
    getOne(req, res, next) {
        petRepo.findById(req.params.pet_id)
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
        petRepo.findById(req.params.pet_id)
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
                    const socket = socketStore.getByKey(customerId);

                    socket.emit('pet.matched', {
                        pet: thePet
                    });
                });
            })
            .catch((err) => {
                next(err);
            });
    }
};
