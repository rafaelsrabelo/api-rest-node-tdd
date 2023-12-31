const TextEncoding = require('text-encoding-utf-8');

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;

const request = require('supertest');
const app = require("../../src/app");

test('Deve criar usuário via signup', () => {
    const email =  `${Date.now()}@email.com`;
    return request(app).post('/auth/signup')
        .send({name: 'James', email: email, password: '123456' })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('James');
            expect(res.body).toHaveProperty('email');
            expect(res.body).not.toHaveProperty('password');
        })
});

test('Deve receber token ao logar', () => {
    const email =  `${Date.now()}@email.com`;
    return app.services.users.create(
        {name: 'Joao Severino', email: email, password: '123456' }
    ).then(() => request(app).post('/auth/signin')
        .send({email, password: '123456'}))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });
});

test('Não deve autenticar usuário com senha errada', () => {
    const email =  `${Date.now()}@email.com`;
    return app.services.users.create(
        {name: 'Joao Severino', email: email, password: '123456' }
    ).then(() => request(app).post('/auth/signin')
        .send({email, password: '312111'}))
        .then((res) => {
            expect(res.status).toBe(401);
            expect(res.body.error).toBe('Usuário ou senha inválida');
        });
});

test('Não deve autenticar usuário que não existe', () => {
    return request(app).post('/auth/signin')
        .send({email: 'ronaldinhogauchoprogramador@gmail.com', password: '312111'})
        .then((res) => {
            expect(res.status).toBe(401);
            expect(res.body.error).toBe('Usuário ou senha inválida');
        });
});

test('Não deve acessar uma rota protegida sem token', () => {
    return request(app).get('/users').then((res) => {
        expect(res.status).toBe(401);
    });
});