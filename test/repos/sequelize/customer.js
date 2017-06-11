const _ = require('lodash');
const assert = require('chai').assert;

const customerRepo = require('../../../app/repos/sequelize/customer');

describe('CustomerRepo', () => {
    describe('#findMatchedCustomersByPet', () => {
        it('should match Alice, Bob and Charlie', (done) => {
            const pet = {
                id: 1,
                age: 0,
                species: 'Dog',
                breed: 'Pomeranian'
            };

            customerRepo.findMatchedCustomersByPet(pet).then((customers) => {
                assert.isArray(customers);

                assert.isTrue(_.some(customers, { name: 'Alice' }));
                assert.isTrue(_.some(customers, { name: 'Bob' }));
                assert.isTrue(_.some(customers, { name: 'Charlie' }));

                done();
            });
        });

        it('should match Bob and Charlie', (done) => {
            const pet = {
                id: 1,
                age: 0,
                species: 'Cat',
                breed: null
            };

            customerRepo.findMatchedCustomersByPet(pet).then((customers) => {
                assert.isArray(customers);

                assert.isTrue(_.some(customers, { name: 'Bob' }));
                assert.isTrue(_.some(customers, { name: 'Charlie' }));

                done();
            });
        });
    });
});
