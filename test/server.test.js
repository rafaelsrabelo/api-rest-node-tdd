const supertest = require('supertest');
const TextEncoding = require('text-encoding-utf-8'); // Substitua pelo módulo apropriado

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;


const request = supertest('http://localhost:3001/api/v1');

test('Deve responder na porta 3001', () => {
    return request.get('/')
        .then(res => expect(res.status).toBe(200));
});