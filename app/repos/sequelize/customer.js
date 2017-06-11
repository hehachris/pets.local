const models = require('../../models');

module.exports = {
    findAll(options) {
        return models.Customer.findAll(options);
    },
    findById(id, options) {
        return models.Customer.findById(id, options);
    },
    findMatchedCustomersByPet(pet) {
        return models.Customer.findAll({
            include: [{
                model: models.CustomerPreference,
                where: {
                    age: {
                        $or: [
                            { $eq: null },
                            { $gte: pet.age }
                        ]
                    },
                    species: {
                        $or: [
                            { $eq: null },
                            { $like: `%${pet.species}%` }
                        ]
                    },
                    breed: {
                        $or: [
                            { $eq: null },
                            { $eq: pet.breed }
                        ]
                    }
                }
            }]
        });
    }
};
