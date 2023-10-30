const request = require('supertest');
const TextEncoding = require('text-encoding-utf-8'); // Substitua pelo módulo apropriado

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;

const app = require("../../src/app");

const email = `${Date.now()}@email.com`

test('Deve retornar todo usuarios', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);

        });
});
test('Deve inserir usuários com sucesso', () => {
    return request(app).post('/users')
        .send({ name: "Bernardo", email: email, password: "123456" })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('Bernardo')
        });
});

test('Não deve criar usuário sem nome', () => {
    return request(app).post('/users')
        .send({
            email: "email@email.com",
            password: "123456"
        }).then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('O nome é obrigatório')
        });
});

test('Não deve criar usuário sem email', () => {
    return request(app).post('/users')
        .send({
            name: "Aurileia Santana",
            password: "1234546"
        }).then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('O email é obrigatório')
        })
});

test('Não deve criar usuário sem senha', () => {
    return request(app).post('/users')
        .send({
            name: "Aurileia Santana",
            email: "contato@email.com",
        }).then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('A senha é obrigatória')
        })
});

test('Não deve criar usuário com email existente', () => {
    return request(app).post('/users')
        .send({ name: "Bernardo", email: email, password: "123456" })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Já existe um usuário com esse email')
        });
});