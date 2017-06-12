const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

chai.use(chaiHttp);

const app = require('../../app');

describe('Customers', () => {
    describe('GET /customers', () => {
        it('should GET all the customers', (done) => {
            chai.request(app)
                .get('/customers')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.isNotEmpty(res.body);

                    assert.property(res.body[0], 'customer_preference');
                    assert.isObject(res.body[0].customer_preference);
                    assert.isNumber(res.body[0].customer_preference.id);

                    done();
                });
        });

        it('should return 404 if customer ID not exist', (done) => {
            chai.request(app)
                .get('/customers/999999')
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                });
        });

        it('should GET one customer', (done) => {
            chai.request(app)
                .get('/customers/2')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.name, 'Bob');

                    assert.property(res.body, 'customer_preference');
                    assert.isObject(res.body.customer_preference);
                    assert.isNumber(res.body.customer_preference.id);

                    done();
                });
        });
    });

    describe('GET /customers/{customer_id}/matches', () => {
        it('should return 404 if customer ID not exist', (done) => {
            chai.request(app)
                .get('/customers/999999/matches')
                .end((err, res) => {
                    assert.equal(res.status, 404);
                    done();
                });
        });

        it('should match some customers', (done) => {
            chai.request(app)
                .get('/customers/1/matches')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.isNotEmpty(res.body);

                    done();
                });
        });

        it('should match some customers', (done) => {
            chai.request(app)
                .get('/customers/2/matches')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.isNotEmpty(res.body);

                    done();
                });
        });
    });

    describe('POST /customers', () => {
        it('should return 500 if missing required fields', (done) => {
            chai.request(app)
                .post('/customers')
                .send({
                    invalid_field: 123
                })
                .end((err, res) => {
                    assert.equal(res.status, 500);

                    done();
                });
        });

        it('should return 201 if customer successfully added', (done) => {
            const arya = {
                name: 'Arya Stark',
                customer_preference: {
                    age: 0,
                    species: 'Dog'
                }
            };

            chai.request(app)
                .post('/customers')
                .send(arya)
                .end((err, res) => {
                    assert.equal(res.status, 201);
                    assert.propertyVal(res.body, 'name', arya.name);

                    done();
                });
        });
    });


    describe('POST /customers/{customer_id}/adopt', () => {
        it('should return 404 if missing pet_id', (done) => {
            chai.request(app)
                .post('/customers/1/adopt')
                .end((err, res) => {
                    assert.equal(res.status, 404);

                    done();
                });
        });

        it('should return 404 if customer ID not exist', (done) => {
            chai.request(app)
                .post('/customers/9999/adopt?pet_id=1')
                .end((err, res) => {
                    assert.equal(res.status, 404);

                    done();
                });
        });

        it('should return 404 if pet ID not exist', (done) => {
            chai.request(app)
                .post('/customers/1/adopt?pet_id=9999')
                .end((err, res) => {
                    assert.equal(res.status, 404);

                    done();
                });
        });

        it('should adopt a pet successfully', (done) => {
            chai.request(app)
                .post('/customers/1/adopt?pet_id=1')
                .end((err, res) => {
                    assert.equal(res.status, 201);
                    assert.equal(res.body.id, 1);
                    assert.equal(res.body.is_adopted, true);

                    done();
                });
        });
    });
});
