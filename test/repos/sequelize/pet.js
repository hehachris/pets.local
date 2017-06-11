const _ = require('lodash');
const assert = require('chai').assert;

const customerRepo = require('../../../app/repos/sequelize/pet');

describe('PetRepo', () => {
    describe('#findMatchedPetsByCustomerPreference', () => {
        it('should match a Pomeranian dog with age 0', (done) => {
            const customerPreference = {
                age: 0,
                species: 'Dog',
                breed: 'Pomeranian'
            };

            customerRepo.findMatchedPetsByCustomerPreference(customerPreference).then((pets) => {
                assert.isArray(pets);

                assert.isTrue(_.some(pets, { name: 'Miu Miu' }));

                done();
            });
        });

        it('should match either dogs or cats', (done) => {
            const customerPreference = {
                age: null,
                species: 'Dog,Cat',
                breed: null
            };

            customerRepo.findMatchedPetsByCustomerPreference(customerPreference).then((pets) => {
                assert.isArray(pets);

                assert.isTrue(_.some(pets, { name: 'Miu Miu' }));
                assert.isTrue(_.some(pets, { name: 'Dicky' }));
                assert.isTrue(_.some(pets, { name: 'Jon Snow' }));
                assert.isTrue(_.some(pets, { name: 'King Slayer' }));

                done();
            });
        });

        it('should match a Rabbit', (done) => {
            const customerPreference = {
                age: null,
                species: 'Rabbit',
                breed: null
            };

            customerRepo.findMatchedPetsByCustomerPreference(customerPreference).then((pets) => {
                assert.isArray(pets);

                assert.isTrue(_.some(pets, { name: 'Snowball' }));

                done();
            });
        });
    });
});
