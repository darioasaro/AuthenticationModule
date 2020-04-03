

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const server = require('../server/server.js');
const user = {
    username:"dario",
    password:"1234"
}

describe('Login Module app ',()=>{
    it('Should set correct Login', (done) => {
    chai
     .request(server)
    .post('/api/auth/login')
    .send({username:user.username, password:user.password})
    .end( function(err,res){
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    return done();
    });
    });
    it('Should set Incorrect Login with bad user', (done) => {
        chai
         .request(server)
        .post('/api/auth/login')
        .send({username:"bad user", password:user.password})
        .end( function(err,res){
        expect(err).to.be.null;
        expect(res).to.have.status(403);
        return done();
        });
        });
        it('Should set Incorrect Login with bad password', (done) => {
            chai
             .request(server)
            .post('/api/auth/login')
            .send({username:user.username, password:"wrong password"})
            .end( function(err,res){
            expect(err).to.be.null;
            expect(res).to.have.status(403);
            return done();
            });
            });
   });

   