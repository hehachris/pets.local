const models = require('../../models');

module.exports = {
    findMatchedPetsByCustomerPreference(customerPreference) {
        const criteria = {
            is_adopted: false
        };

        if (customerPreference.age !== null) {
            criteria.age = {
                $lte: customerPreference.age
            };
        }

        if (customerPreference.species !== null) {
            criteria.species = {
                $in: customerPreference.species.split(',')
            };
        }

        if (customerPreference.breed !== null) {
            criteria.breed = {
                $in: customerPreference.breed.split(',')
            };
        }

        return models.Pet.findAll({
            where: criteria
        });
    }
};
