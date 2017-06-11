const models = require('../models');

module.exports = {
    getAll(req, res) {
        models.Customer.findAll().then((customers) => {
            res.send(customers);
        });
    },
    getOne(req, res) {
        models.Customer.findById(req.params.customer_id).then((customer) => {
            if (!customer) {
                res.sendStatus(404);
            } else {
                res.send(customer);
            }
        });
    },
    post(req, res) {
        models.Customer.create({
            name: req.body.name
        }).then((customer) => {
            res.status(201).send(customer);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }
};
