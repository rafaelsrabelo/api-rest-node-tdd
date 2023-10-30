const request = require('supertest');
const TextEncoding = require('text-encoding-utf-8');

const MAIN_ROUTE = '/users';

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
            expect(res.body.name).toBe('Bernardo');
            expect(res.body).not.toHaveProperty('password');
        });
});

test('Deve armazenar senha criptografada', async () => {
    const res = await request(app).post('/users')
        .send({name: 'Maria Josefa', email: `${Date.now()}@mail.com`, password: '123456' })
    expect(res.status).toBe(201);

    const {id} = res.body;
    const userDb = await app.services.users.findOne({id});
    expect(userDb.password).not.toBeUndefined();
    expect(userDb.password).not.toBe('123456'); // nao pode ser a senha que enviamos, pois nao eh criptografada
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