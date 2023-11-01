const request = require('supertest');
const jwt = require('jsonwebtoken');
const TextEncoding = require('text-encoding-utf-8');

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;

const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
    const res = await app.services.users.create({
        name: 'User account', email: `${Date.now()}@email.com`, password: "123456"
    });

    user = { ...res[0] };
    user.token = jwt.sign(user, 'Secret');
    console.log(user.token);
});

test('Deve inserir uma conta com sucesso', () => {
    return request(app).post(MAIN_ROUTE)
        .send({user_id: user.id, name: 'Acc #1',})
        .set('authorization', `bearer ${user.token}`)
        .then((result) => {
            expect(result.status).toBe(201);
            expect(result.body.name).toBe('Acc #1');
        });
});

test('Deve listar todas as contas', () => {
    return app.db('accounts')
        .insert({ name: 'Acc list', user_id: user.id })
        .then(() => request(app).get(MAIN_ROUTE).set('authorization', `bearer ${user.token}`))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});

test('Deve retornar uma conta por id', () => {
    return app.db('accounts')
        .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
        .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Acc By Id');
            expect(res.body.user_id).toBe(user.id);
        })
});

test('Deve alterar uma conta', () => {
    return app.db('accounts')
        .insert({ name: 'Acc To Update', user_id: user.id }, ['id'])
        .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
            .send({ name: 'Acc Updated' })
            .set('authorization', `bearer ${user.token}`))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Acc Updated')
        });
});

test('Deve remover uma conta', () => {
    return app.db('accounts')
        .insert({ name: 'Acc To Update', user_id: user.id }, ['id'])
        .then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)
        .set('authorization', `bearer ${user.token} `))
        .then((res) => {
            expect(res.status).toBe(204);
        });
});

test('Não deve inserir uma conta sem nome', () => {
    return request(app).post(MAIN_ROUTE)
    .send({user_id: user.id,})
    .set('authorization', `bearer ${user.token} `)
    .then((result) => {
        expect(result.status).toBe(400);
        expect(result.body.error).toBe('Nome é um atributo obrigatório');
    });
})