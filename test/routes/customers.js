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

                    done();
                });
        });
    });

    describe('POST /customers', () => {
        it('should return 400 if missing required fields', (done) => {
            chai.request(app)
                .post('/customers')
                .send({
                    invalid_field: 123
                })
                .end((err, res) => {
                    assert.equal(res.status, 400);

                    done();
                });
        });

        it('should return 201 if customer successfully added', (done) => {
            const nard = {
                name: 'Arya Stark'
            };

            chai.request(app)
                .post('/customers')
                .send(nard)
                .end((err, res) => {
                    assert.equal(res.status, 201);
                    assert.propertyVal(res.body, 'name', nard.name);

                    done();
                });
        });
    });
});
