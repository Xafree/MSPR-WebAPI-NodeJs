let app = require('../index');
var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);
let API = 'http://localhost:3050'
describe('Get prospects',()=>{
    it('it should GET all the books', (done) => {
        chai.request(API)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('POST prospect', () => {
    it('Try to send data on database', (done) => {
        let prospect = {
            'First_Name__c': "PostManTest5",
            'Email__c': "postman.test5@gmail.com"
        }
        chai.request(API)
            .post('/prospect')
            .send(prospect)
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });
});