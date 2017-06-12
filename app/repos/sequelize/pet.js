const config = require('../../../config');
const models = require('../../models');
const geo = require('../../libs/geo');

module.exports = {
    findAll(options) {
        return models.Pet.findAll(options);
    },
    findById(id, options) {
        return models.Pet.findById(id, options);
    },
    findMatchedPetsByCustomerPreference(customerPreference) {
        const criteria = {
            is_adopted: false,
            available_from: {
                $lte: new Date()
            }
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
    },
    findNearby(lat, lng, km = config.defaultDistance) {
        const margin = geo.getMargin(lat, lng, km);

        return this.findAll({
            where: {
                latitude: {
                    $between: [margin.bottomLat, margin.topLat]
                },
                longitude: {
                    $between: [margin.leftLng, margin.rightLng]
                }
            }
        }).then((pets) => {
            const nearByPetIds = geo.nearby(pets, lat, lng, km).map(v => v.i);

            return pets.filter(pet => nearByPetIds.includes(pet.id));
        });
    }
};
