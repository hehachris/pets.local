const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

chai.use(chaiHttp);

const app = require('../../app');

describe('Pets', () => {
    describe('GET /pets)', () => {
        it('it should GET all the pets', (done) => {

        });
    });
});
