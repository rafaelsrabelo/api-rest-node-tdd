const request = require('supertest');
const TextEncoding = require('text-encoding-utf-8'); // Substitua pelo módulo apropriado

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;

const app = require("../src/app");

test('Deve responder na raiz', () => {
    return request(app).get('/api/v1')
        .then(res => {
            expect(res.status).toBe(200);
        })
});