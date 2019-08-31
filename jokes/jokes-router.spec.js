const request = require('supertest');
const server = require('../index.js'); 

describe('jokes-router.js', () => {
    // GET endpoint on /
    describe('GET command on /', () => {
        it('should return a 500 status', async () => {
            const response = await request(server).get('/');
            // Expecting 500 because json web token is not included in the test headers
            expect(response.status).toEqual(500);
        });

        it('should return a object from the / endpoint', async () => {
            const response = await request(server).get('/');
            expect(typeof response.body).toEqual('object');
        });
    });
});