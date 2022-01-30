let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

chai.use(chaiHttp);
describe('/POST prospect', () => {
    it('Try to send data on database', (done) => {
        let prospect = {
            'First_Name__c': "Charle",
            'Email__c': "test@test.com"
        }
        chai.request(server)
            .post('/prospect')
            .send(prospect)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

});