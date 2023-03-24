//import createServer function to start server and listen on default port. optional port param
const createServer = require('../api/server');
const request = require('supertest');

//initialize app variable for server instance
let app;
// start server and listen on port before tests
beforeAll(() => {
  app = createServer();
});
// close server after tests
afterAll((done) => {
  app.close(done);
});

describe('cryptoRouter', () => {

  describe('GET /all', () => {

    it('should return array of strings and 200 status code', async () => {
      const response = await request(app)
        .get('/crypto/all')
        .set('Authorization', 'Bearer f2b0156f-cf95-4e29-9f57-51296a481c6a')
        .send({ user: 'user@test.com' });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

  });

  describe('GET /pools/:coin', () => {

    it('should return message if no data is available ', async () => {
      const response = await request(app)
        .get('/crypto/pools/randomCoin')
        .set('Authorization', 'Bearer f2b0156f-cf95-4e29-9f57-51296a481c6a')
        .send({ user: 'user@test.com' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual('no reward data for this coin');
    });

    it('should return array of coin data ', async () => {
      const response = await request(app)
        .get('/crypto/pools/BTC')
        .set('Authorization', 'Bearer f2b0156f-cf95-4e29-9f57-51296a481c6a')
        .send({ user: 'user@test.com' });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

  });

});

  describe('route to unknown address', () => {
    it('should return 404 status code and message Page not found', async () => {
      const response = await request(app)
        .get('/crypto/fake')
        .set('Authorization', 'Bearer f2b0156f-cf95-4e29-9f57-51296a481c6a')
        .send({ user: 'user@test.com' });
      expect(response.status).toBe(404);
      expect(response.body).toEqual('Page not found');
  })
})