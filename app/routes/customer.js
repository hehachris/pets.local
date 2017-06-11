const models = require('../models');

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
