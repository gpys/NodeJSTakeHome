const createServer = require('../api/server');
const app = createServer();

const request = require('supertest');



describe('authCheck middleware', () => {

    it('should return 401 if no auth header or user is present', async () => {
        const response = await request(app)
        //make request with no credentials
        .get('/crypto')
        .send({});

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ err: 'not authorized' });
    });

    it('should return 401 if the bearer token or user does not match requirements', async () => {
        const response = await request(app)
        //make request with invalid credentials
          .get('/crypto')
          .set('Authorization', 'Bearer badToken')
          .send({ user: 'badUser@test.com' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ err: 'not authorized' })
    });

    it('should route to crypto router if bearer token and user match', async () => {
        const response = await request(app)
        //make request with valid credentials
          .get('/crypto')
          .set('Authorization', 'Bearer f2b0156f-cf95-4e29-9f57-51296a481c6a')
          .send({ user: 'user@test.com' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual('welcome to the crypto page');
    });


});