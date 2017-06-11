const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

chai.use(chaiHttp);

const app = require('../../app');

describe('Pets', () => {
    describe('GET /pets', () => {
        it('should GET all the pets', (done) => {
            chai.request(app)
                .get('/pets')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.isNotEmpty(res.body);

                    done();
                });
        });

        it('should return 404 if pet ID not exist', (done) => {
            chai.request(app)
                .get('/pets/999999')
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                });
        });

        it('should GET one pet', (done) => {
            chai.request(app)
                .get('/pets/1')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.name, 'Miu Miu');

                    done();
                });
        });
    });

    describe('GET /pets/{pet_id}/matches', () => {
        it('should return 404 if pet ID not exist', (done) => {
            chai.request(app)
                .get('/pets/999999/matches')
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                });
        });

        it('should match some customers', (done) => {
            chai.request(app)
                .get('/pets/1/matches')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.isNotEmpty(res.body);

                    done();
                });
        });

        it('should match some customers', (done) => {
            chai.request(app)
                .get('/pets/2/matches')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.isNotEmpty(res.body);

                    done();
                });
        });
    });

    describe('POST /pets', () => {
        it('should return 400 if missing required fields', (done) => {
            chai.request(app)
                .post('/pets')
                .send({
                    name: 'Nerd Stark'
                })
                .end((err, res) => {
                    assert.equal(res.status, 400);

                    done();
                });
        });

        it('should return 201 if pet successfully added', (done) => {
            const nard = {
                name: 'Nerd Stark',
                available_from: new Date('2017-12-25'),
                age: 15,
                species: 'Dog',
                breed: 'Poodle'
            };

            chai.request(app)
                .post('/pets')
                .send(nard)
                .end((err, res) => {
                    assert.equal(res.status, 201);
                    assert.propertyVal(res.body, 'name', nard.name);
                    assert.propertyVal(res.body, 'available_from', nard.available_from.toISOString());
                    assert.propertyVal(res.body, 'age', nard.age);
                    assert.propertyVal(res.body, 'species', nard.species);
                    assert.propertyVal(res.body, 'breed', nard.breed);

                    done();
                });
        });
    });
});
