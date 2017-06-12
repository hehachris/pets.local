const Geo = require('geo-nearby');

const models = require('../../models');

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
    findNearby(lat, lng, km = 2) {
        return this.findAll()
            .then((pets) => {
                const geo = new Geo(pets, { setOptions: { id: 'id', lat: 'latitude', lon: 'longitude' } });

                const nearByPetIds = geo.nearBy(lat, lng, km * 1000).map((v) => {
                    return v.i;
                });

                return pets.filter((pet) => {
                    return nearByPetIds.includes(pet.id);
                });
            });
    }
};
