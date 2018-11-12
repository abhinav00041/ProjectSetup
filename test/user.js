//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let users = require('../dist/lib/models/users');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist/index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('users', () => {
   // beforeEach((done) => { //Before each test we empty the database
    //    users.remove({}, (err) => { 
    //       done();         
    //    });     
   // });
/*
   Test the /GET route
*/
describe('/POST user', () => {
    it('it should Post a users', (done) => {
        let postdata ={
            "data": [
              {
                "type": "string",
                "id": "string",
                "attributes": {
                  "username": "abhinav",
                  "password": "password",
                  "name": "abhinav",
                  "admin": true
                }
              }
            ],
            "meta": {},
            "include": {}
          }
      chai.request('http://localhost:4000/api')
          .post('/user')
          .send(postdata)
          .end((err, res) => {
             // console.log(res)
              res.should.have.status(201);
              res.body.should.not.be.empty;
             // res.body.length.should.be.eql(2);
            done();
          });
    });
});
describe('/POST user', () => {
    it('it should try to Post a duplicate users', (done) => {
        let postdata ={
            "data": [
              {
                "type": "string",
                "id": "string",
                "attributes": {
                  "username": "abhinav",
                  "password": "password",
                  "name": "abhinav",
                  "admin": true
                }
              }
            ],
            "meta": {},
            "include": {}
          }
      chai.request('http://localhost:4000/api')
          .post('/user')
          .send(postdata)
          .end((err, res) => {
             // console.log(res)
              res.should.have.status(409);
              res.body.should.not.be.empty;
            done();
          });
    });
});
describe('/GET user', () => {
    it('it should GET all the users', (done) => {
      chai.request('http://localhost:4000/api')
          .get('/user')
          .end((err, res) => {
             // console.log(res)
              res.should.have.status(200);
              res.body.should.not.be.empty;
            done();
          });
    });
});
describe('/loginUser user', () => {
    it('it should login as users', (done) => {
        let postdata =
              {
                  "username": "abhinav",
                  "password": "password",
          }
      chai.request('http://localhost:4000/api')
          .post('/loginUser')
          .send(postdata)
          .end((err, res) => {
             // console.log(res)
              res.should.have.status(200);
              res.body.should.not.be.empty;
            done();
          });
    });
});
describe('/loginUser user', () => {
    it('it should try login as users with worng password', (done) => {
        let postdata =
              {
                  "username": "abhinav",
                  "password": "password11",
          }
      chai.request('http://localhost:4000/api')
          .post('/loginUser')
          .send(postdata)
          .end((err, res) => {
             // console.log(res)
              res.should.have.status(401);
              res.body.should.not.be.empty;
            done();
          });
    });
});
describe('/loginUser user', () => {
    it('it should try login as users with worng username', (done) => {
        let postdata =
              {
                  "username": "abhinav11",
                  "password": "password",
          }
      chai.request('http://localhost:4000/api')
          .post('/loginUser')
          .send(postdata)
          .end((err, res) => {
             // console.log(res)
              res.should.have.status(204);
              res.body.should.be.empty;
            done();
          });
    });
});
describe('/loginUser user', () => {
    it('it should try login as users without password', (done) => {
        let postdata =
              {
                  "username": "abhinav",
                  "password": "",
          }
      chai.request('http://localhost:4000/api')
          .post('/loginUser')
          .send(postdata)
          .end((err, res) => {
             // console.log(res)
              res.should.have.status(203);
              res.body.should.not.be.empty;
            done();
          });
    });
}); 
describe('/loginUser user', () => {
    it('it should try login as users without username', (done) => {
        let postdata =
              {
                  "username": "",
                  "password": "password",
          }
      chai.request('http://localhost:4000/api')
          .post('/loginUser')
          .send(postdata)
          .end((err, res) => {
             // console.log(res)
              res.should.have.status(203);
              res.body.should.not.be.empty;
            done();
          });
    });
}); 
});