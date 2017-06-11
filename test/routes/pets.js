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
});
