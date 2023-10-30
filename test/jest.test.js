const TextEncoding = require('text-encoding-utf-8'); // Substitua pelo módulo apropriado

global.TextEncoder = TextEncoding.TextEncoder;
global.TextDecoder = TextEncoding.TextDecoder;

test('Devo conhecer as principais assertivas do jest', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Devo saber trabalhar com objetos', () => {
  const obj = { name: "Rafael", email: "rafaelrabelodev@gmail.com" };
  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('name', 'Rafael');
  expect(obj.name).toBe('Rafael');
});