const request = require('supertest');
const server = require('../index.js'); 

describe('auth-router.js', () => {
    // POST endpoint on /login
    describe('POST command on /login', () => {
        it('it should return a 200 status', async () => {
            const response = await request(server)
            .post('/login')
            .send({username: "John1", password: "moon"})
            expect(response.status).toEqual(200);
        });

        it('should return a object (username, token) from the /login endpoint', async () => {
            const response = await request(server)
            .post('/login')
            .send({username: "John2", password: "moon"});
            expect(!!response.body.token).toEqual(true);
        });
    });

     // POST endpoint on /register
     describe('POST command on /register', () => {
        it('it should return a 200 status', async () => {
            const response = await request(server)
            .post('/register')
            .send({username: "Bob1", password: "apples"})
            expect(response.status).toEqual(200);
        });

        it('should return a object (id, username, password) from the /register endpoint', async () => {
            const response = await request(server)
            .post('/register')
            .send({username: "Bob2", password: "apples"});
            expect(!!(response.body.id && response.body.username && response.body.password)).toEqual(true);
        });
    });
});