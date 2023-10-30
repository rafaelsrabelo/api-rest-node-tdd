const request = require('supertest');
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
});

test('Deve inserir uma conta com sucesso', () => {
    return request(app).post(MAIN_ROUTE)
        .send({
            user_id: user.id,
            name: 'Acc #1',
        }).then((result) => {
            expect(result.status).toBe(201);
            expect(result.body.name).toBe('Acc #1');
        });
});

test('Deve listar todas as contas', () => {
    return app.db('accounts')
        .insert({ name: 'Acc list', user_id: user.id })
        .then(() => request(app).get(MAIN_ROUTE))
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});