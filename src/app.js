const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();
const consign = require('consign');
const knex = require('knex');
const swaggerDocks = require('./utils/swagger.json');
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'rumi',
    user: 'postgres',
    password: 'example'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: 'src/migrations'
  }
}
);

app.db = db;

const apiVersion = '/api/v1';

consign({ 'cwd': 'src' })
  .include('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

app.use(apiVersion, app._router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocks));

app.get(`${apiVersion}/`, (req, res) => {
  res.status(200).json({
    message: `Bem vindo à API da versão 1 da Rumi`
  });
});

module.exports = app;
