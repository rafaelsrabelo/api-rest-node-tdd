const TextEncoding = require('text-encoding-utf-8');

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;

const request = require('supertest');
const app = require("../../src/app");

test('Deve listar apenas as transações do usuário', () => {};