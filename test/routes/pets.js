const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

chai.use(chaiHttp);

const app = require('../../app');

describe('Pets', () => {
    describe('GET /pets', () => {
        it('it should GET all the pets', (done) => {
            chai.request(app)
                .get('/pets')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body, 'array');
                    assert.isNotEmpty(res.body);

                    done();
                });
        });
    });
});
