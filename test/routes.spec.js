const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        database.seed.run().then(() => {
          done();
        });
      });
    });
  });

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
  describe('get /api/v1/palettes', () => {
    it('should return all palettes', () => {
      return chai
        .request(server)
        .get('/api/v1/palettes')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('id');
          response.body[0].should.have.property('color1');
          response.body[0].should.have.property('color2');
          response.body[0].should.have.property('color3');
          response.body[0].should.have.property('color4');
          response.body[0].should.have.property('color5');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('project_id');
        })
        .catch(err => {
          throw err;
        });
    });
  });

  describe('POST /api/v1/palettes', () => {
    it('should create new palette', () => {
      const colors = ['red', 'green', 'blue', 'purple', 'violet'];
      const project_id = '1';
      const name = 'jeffster';
      return chai
        .request(server)
        .post('/api/v1/palettes')
        .send({
          palettes: colors,
          name,
          project_id
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('array');
          
          response.body[0].should.equal(2);
        })
        .catch(err => {
          throw err;
        });
    });

    it('should return 422 if missing info', () => {
      const colors = ['red', 'green', 'blue', 'purple', 'violet'];
      const project_id = '2';
      const name = 'jeffster';
      return chai
        .request(server)
        .post('/api/v1/palettes')
        .send({
          //palettes: colors,
          name,
          project_id
        })
        .then(response => {
          response.should.have.status(422);
          response.body.error.should.equal(
            'Expected format: { palettes: <Array>, name: <String> }. You\'re missing a "palettes" property.'
          );
        })
        .catch(err => {
          throw err;
        });
    });
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should delete a palette', () => {
      return chai
        .request(server)
        .delete('/api/v1/palettes/1')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.equal(1);
        });
    });
  });

  describe('GET /api/v1/projects', () => {
    it('should return all projects', () => {
      return chai
        .request(server)
        .get('/api/v1/projects')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('id');
        })
        .catch(err => {
          throw err;
        });
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should create new project', () => {
      const name = 'jeffster';
      return chai
        .request(server)
        .post('/api/v1/projects')
        .send({
          name
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.equal(2);
        })
        .catch(err => {
          throw err;
        });
    });

    it('should return 422 if missing info', () => {
      return chai
        .request(server)
        .post('/api/v1/palettes')
        .send({
          //name
        })
        .then(response => {
          response.should.have.status(422);
          response.body.error.should.equal(
            'Expected format: { palettes: <Array>, name: <String> }. You\'re missing a "palettes" property.'
          );
        })
        .catch(err => {
          throw err;
        });
    });
  });
});
