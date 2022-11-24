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

  var token;
  var note_id;

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
      token=res.body.data;
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

  //11.Valid Create note test case
  describe('Create Note', () => {
    const inputBody={
      "title":"Mynote-1",
      "description":"Good morning",
    }
    it('Given new note details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('authorization',`Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          console.log(res.body);
         expect(res.statusCode).to.be.equal(201);
          done();
        });
      });
    });

    //12.Valid another Create note test case with note id
  describe('Create Note', () => {
    const inputBody={
      "title":"Mynote-2",
      "description":"Good afternoon",
    }
    it('Given another new note details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('authorization',`Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          note_id=res.body.data._id;
          console.log("Note id is ======>",note_id);
          console.log(res.body);
          expect(res.statusCode).to.be.equal(201);
          done();
        });
      });
    });

    //13.Get all notes test case
  describe('Get all Notes', () => {
        it('Given new note details should get from database', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('authorization',`Bearer ${token}`)
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });
    });  

    //14.Get a note by id test case
  describe('Get a note by id', () => {
    it('Given note details should get using id from database', (done) => {
      request(app)
        .get(`/api/v1/notes/${note_id}`)
        .set('authorization',`Bearer ${token}`)
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });
    });

    //15.Update a note by id testcase
    describe('Update Note by id', () => {
      const inputBody={
        "color":"Black"
      }
      it('Given updated note details should be saved in database', (done) => {
        request(app)
          .put(`/api/v1/notes/${note_id}`)
          .set('authorization',`Bearer ${token}`)
          .send(inputBody)
          .end((err, res) => {
            console.log(res.body);
            expect(res.statusCode).to.be.equal(202);
            done();
          });
        });
      });

    

  //16.Inalid Create note without title test case 
  describe('Create Note', () => {
    const inputBody={
      "title":"",
      "description":"hiiii....",
    }
    it('Given new note details should not be saved in database', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('authorization',`Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          console.log(res.body);
         expect(res.statusCode).to.be.equal(500);
          done();
        });
      });
    });
    //17.Inalid Create note without description test case
    describe('Create Note', () => {
      const inputBody={
        "title":"Mynote-3",
        "description":"",
      }
      it('Given new note details should not be saved in database', (done) => {
        request(app)
          .post('/api/v1/notes')
          .set('authorization',`Bearer ${token}`)
          .send(inputBody)
          .end((err, res) => {
            console.log(res.body);
           expect(res.statusCode).to.be.equal(500);
            done();
          });
        });
      });

    //18.archive a note by id test case
      describe('Archive a note by id', () => {
        it('Given note details should archive using id from database', (done) => {
          request(app)
            .put(`/api/v1/notes/${note_id}/archive`)
            .set('authorization',`Bearer ${token}`)
            .end((err, res) => {
              console.log(res.body);
              expect(res.statusCode).to.be.equal(202);
              done();
            });
          });
        });

   //19.Trash a note by id test case
       describe('Trash a note by id', () => {
        it('Given note details should be trashed using id from database', (done) => {
          request(app)
            .put(`/api/v1/notes/${note_id}/trash`)
            .set('authorization',`Bearer ${token}`)
            .end((err, res) => {
              console.log(res.body);
              expect(res.statusCode).to.be.equal(202);
              done();
            });
          });
        });
        
    //20.Delete a note by id test case
    describe('Delete a note by id', () => {
      it('Given note details should be deleted from database using id', (done) => {
         request(app)
          .delete(`/api/v1/notes/${note_id}`)
          .set('authorization',`Bearer ${token}`)
         .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });
    });
});

