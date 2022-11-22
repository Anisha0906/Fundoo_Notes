import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

//1.Test case for valid user registration
describe('UserRegistration', () => {
  const inputBody={
    "firstname":"Anisha",
    "lastname":"Das",
    "email":"anishadas880@gmail.com",
    "password":"abcd@1234"
  }
  it('user registration details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        done();
      });
    });
  });

//2.Testcase for invalid firstname
describe('UserRegistration', () => {
  const inputBody={
    "firstname":"An",
    "lastname":"Das",
    "email":"anishadas880@gmail.com",
    "password":"abcd@1234"
  }
  it('user registration details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  //3.Testcase for invalid lastname
describe('UserRegistration', () => {
  const inputBody={
    "firstname":"Anisha",
    "lastname":"D",
    "email":"anishadas880@gmail.com",
    "password":"abcd@1234"
  }
  it('user registration details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  //4.Testcase for invalid email
describe('UserRegistration', () => {
  const inputBody={
    "firstname":"Anisha",
    "lastname":"Das",
    "email":"abcde@gmail.com",
    "password":"abcd@1234"
  }
  it('user registration details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  //5.Testcase for invalid password
describe('UserRegistration', () => {
  const inputBody={
    "firstname":"Anisha",
    "lastname":"Das",
    "email":"anishadas880@gmail.com",
    "password":"1234"
  }
  it('user registration details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  //6.Testcase for data not found
describe('UserRegistration', () => {
  const inputBody={
    "firstname":"Anisha",
    "lastname":"Das",
    "email":"anishadas880@gmail.com",
    "password":""
  }
  it('user registration details should be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
    });
  });
});

