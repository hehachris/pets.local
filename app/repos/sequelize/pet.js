const Geo = require('geo-nearby');

const config = require('../../../config');
const models = require('../../models');

function getMargin(pLatitude, pLongitude, km) {
    const latRadian = (pLatitude * Math.PI) / 180;

    const degLatKm = 110.574235;
    const degLongKm = 110.572833 * Math.cos(latRadian);
    const deltaLat = km / degLatKm;
    const deltaLong = km / degLongKm;

    const topLat = pLatitude + deltaLat;
    const bottomLat = pLatitude - deltaLat;
    const leftLng = pLongitude - deltaLong;
    const rightLng = pLongitude + deltaLong;

    return {
        topLat,
        bottomLat,
        leftLng,
        rightLng
    };
}

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
        const margin = getMargin(lat, lng, km);

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
            const geo = new Geo(pets, {
                setOptions: {
                    id: 'id',
                    lat: 'latitude',
                    lon: 'longitude'
                }
            });

            const nearByPetIds = geo.nearBy(lat, lng, km * 1000).map(v => v.i);

            return pets.filter(pet => nearByPetIds.includes(pet.id));
        });
    }
};
