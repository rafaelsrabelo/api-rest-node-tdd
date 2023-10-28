const request = require('supertest');

const app = require("../src/app");

test('Deve listar todos os usuários', () => {
    return request(app).get('/users').then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toHaveProperty("name", "Rafael Rabelo")
    })
})

test('Deve inserir usuários com sucesso', () => {
    return request(app).post('/users')
        .send({ name: "Bernardo", email: "bernardo@gmail.com" })
        .then(res => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe("Bernardo")
        })
})