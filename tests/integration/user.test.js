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
  it('Given user registration details should be saved in database', (done) => {
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
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
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
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

  //4.Testcase for invalid email
describe('UserRegistration', () => {
  const inputBody={
    "firstname":"Anisha",
    "lastname":"Das",
    "email":"abcde",
    "password":"abcd@1234"
  }
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
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
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
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
  it('Given user registration details should not be saved in database', (done) => {
    request(app)
      .post('/api/v1/users/Register')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

//7.Test case for valid user login
describe('UserLogin', () => {
  const inputBody={
    "email":"anishadas880@gmail.com",
    "password":"abcd@1234"
  }
  it('Given user login details should log in database', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  //8.Test case for invalid login email
describe('UserLogin', () => {
  const inputBody={
    "email":"abcde@gmail.com",
    "password":"abcd@1234"
  }
  it('Given unregistered user login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

  //9.Test case for invalid login password
describe('UserLogin', () => {
  const inputBody={
    "email":"anishadas880@gmail.com",
    "password":"123456789"
  }
  it('Given invalid password login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

  //10.Test case for password data not found
describe('UserLogin', () => {
  const inputBody={
    "email":"anishadas880@gmail.com",
    "password":""
  }
  it('Given invalid password login details should not get logged in', (done) => {
    request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(500);
        done();
      });
    });
  });

});

