const request = require('supertest');
const jwt = require('jsonwebtoken');
const TextEncoding = require('text-encoding-utf-8');

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;

const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;
let user2;

beforeAll(async () => {
    const res1 = await app.services.users.create({
        name: 'User account', email: `${Date.now()}@email.com`, password: "123456"
    });
    user = { ...res1[0] };
    user.token = jwt.sign(user, 'Secret');

    const res2 = await app.services.users.create({
        name: 'User account 2', email: `${Date.now()}@gmail.com`, password: "123456"
    });
    user2 = { ...res2[0] };
});

beforeEach(async () => {
    await app.db('accounts').del();
});

test('Deve listar apenas as contas do usuário', () => {
    return app.db('accounts')
        .insert([
            { name: 'Acc User #1', user_id: user.id },
            { name: 'Acc User #2', user_id: user2.id }
        ])
        .then(() => request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${user.token}`)
            .then((res) => {
                if (res.status !== 200) {
                    console.error('Test failed: ', res.body);
                }
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(1);
                expect(res.body[0].name).toBe('Acc User #1');
            }))
});

test('Deve inserir uma conta com sucesso', () => {
    return request(app).post(MAIN_ROUTE)
        .send({ name: 'Acc #1' })
        .set('authorization', `bearer ${user.token}`)
        .then((result) => {
            expect(result.status).toBe(201);
            expect(result.body.name).toBe('Acc #1');
        });
});

test('Deve listar apenas as contas do usuário', () => {
    return app.db('accounts')
        .insert([
            { name: 'Acc User #1', user_id: user.id },
            { name: 'Acc User #2', user_id: user2.id }
        ])
        .then(() => request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${user.token}`)
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.length).toBe(1);
                expect(res.body[0].name).toBe('Acc User #1');
            }))

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
        .send()
        .set('authorization', `bearer ${user.token} `)
        .then((result) => {
            expect(result.status).toBe(400);
            expect(result.body.error).toBe('Nome é um atributo obrigatório');
        });
})