/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const request = require('supertest')
const app = require('../../src/app.js');
const { Country, Activity, conn } = require('../../src/db.js');


const agent = session(app);

const country = {
  name:'Pirulandia',
  code:'PIR',
  capital:'Pirulina',
  region:'Patagonia',
  area:25.12,
  population:1,
  continent: 'Chochonia'

};
const activity = {
  name: 'cualquiera',
  difficulty: 1,
  season: 'winter',
  countries: ['Pirulandia'] 
}


describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  
    describe('GET /countries', () => {
    
    it('should get 200', async () =>{
      agent.get('/countries')
      .expect(200)
      }
    );
    it('should have body', async() => {
      const res = await request(app).get('/countries')
      expect(res.body).to.exist
      
    })
    it('should have body with length', async() => {
      const res = await request(app).get('/countries')
      expect(res.body).to.have.lengthOf(1)

    })
    it('should have country Pirulandia', async() => {
      const res = await request(app).get('/countries')
      expect(res.body[0]).to.have.property('name')
      expect(res.body[0].name).to.be.equal('Pirulandia')

    })

  });
});
 
describe('Activity routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country))
    .then( () => Activity.sync({force:true}))
    );
  
    describe('POST /activity', () => {

      it('should get 201', async () =>{
        agent.get('/countries')
        .expect(201)
        }
      );
    
    it('should have body', async() => {
      const res = await request(app).post('/activity').send(activity)
      expect(res.body).to.exist
      
    })
    it('should have cualquiera activity ', async() => {
      const res = await request(app).post('/activity').send(activity)
      expect(res.body.name).to.be.equal('cualquiera')
      
    })
    

  });
});