const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);


describe('Client Routes', () => {
  

  it('should return 404', () => {
    return chai
      .request(server)
      .get('/sad')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(err => {
        throw err;
      });
  });
});

describe('API Routes', () => {
  beforeEach(() => {
    // runs before each test in this block
  });

  it('should', () => {
  
  });
});

// const chai = require('chai');
// const should = chai.should();
// const chaiHttp = require('chai-http');
// const server = require('../server');

// chai.use(chaiHttp);

// describe('Client Routes', () => {
//   it('should return the homepage with text', () => {
//     return chai
//       .request(server)
//       .get('/')
//       .then(response => {
//         response.should.have.status(200);
//         response.should.be.html;
//         response.res.text.should.equal("We're going to test all the routes!");
//       })
//       .catch(err => {
//         throw err;
//       });
//   });

//   it('should return 404', () => {
//     return chai
//       .request(server)
//       .get('/unicorns')
//       .then(response => {
//         response.should.have.status(404);
//       })
//       .catch(err => {
//         throw err;
//       });
//   });
// });

// describe('API Routes', () => {
//   describe('get /api/v1/students', () => {
//     it('should return all of the students', () => {
//       return chai
//         .request(server)
//         .get('/api/v1/students')
//         .then(response => {
//           response.should.have.status(200);
//           response.should.be.json;
//           response.body.should.be.a('array');
//           response.body.length.should.equal(3);
//           response.body[0].should.have.property('lastname');
//           response.body[0].lastname.should.equal('Turing');
//           response.body[0].should.have.property('program');
//           response.body[0].program.should.equal('FE');
//           response.body[0].should.have.property('enrolled');
//           response.body[0].enrolled.should.equal(true);
//         })
//         .catch(err => {
//           throw err;
//         });
//     });
//     describe('POST /api/v1/students', () => {
//       it('should create new student', () => {
//         return chai
//           .request(server)
//           .post('/api/v1/students')
//           .send({
//             lastname: 'Knuth',
//             program: 'FE',
//             enrolled: true
//           })
//           .then(response => {
//             response.should.have.status(201);
//             response.should.be.json;
//             response.body.should.be.a('object');
//             response.body.should.have.property('lastname');
//             response.body.lastname.should.equal('Knuth');
//             response.body.should.have.property('program');
//             response.body.program.should.equal('FE');
//             response.body.should.have.property('enrolled');
//             response.body.enrolled.should.equal(true);
//           })
//           .catch(err => {
//             throw err;
//           });
//       });

//       it('should return 422 if missing info', () => {
//         return chai
//           .request(server)
//           .post('/api/v1/students')
//           .send({
//             //lastname: 'Knuth',
//             program: 'FE',
//             enrolled: true
//           })
//           .then(response => {
//             response.should.have.status(422);
//             response.body.error.should.equal('You are missing data!');
//           })
//           .catch(err => {
//             throw err;
//           });
//       });
//     });
//   });
// });
