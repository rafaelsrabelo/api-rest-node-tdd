const TextEncoding = require('text-encoding-utf-8');

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;

const request = require('supertest');
const app = require("../../src/app");

test('Deve receber token ao logar', () => {
    email =  `${Date.now()}@email.com`;
    return app.services.users.create(
        {name: 'Joao Severino', email: email, password: '123456' }
    ).then(() => request(app).post('/auth/signin')
        .send({email, password: '123456'}))
        .then((res) => {
            expect(res.status).toBe(200);
            console.log(res.body);
            expect(res.body).toHaveProperty('token');
        });
});

