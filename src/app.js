require('dotenv').config();
const express = require('express');
const consign = require('consign');
const knex = require('knex');
const swaggerUi = require('swagger-ui-express');

const swaggerDocks = require('./utils/swagger.json');

const app = express();
const apiVersion = '/api/v1';

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
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

consign({ 'cwd': 'src' })
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.use(apiVersion, app._router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocks));

app.get(`${apiVersion}/`, (req, res) => {
  res.status(200).json({
    message: `Bem vindo à API da versão 1 da Rumi`
  });
});

app.use((err, req, res, next) => {

  const { name, message, stack } = err;
  if (name === 'ValidationError') res.status(400).json({ error: message })
  else res.status(500).json({ name, message, stack });
  next(err);
})

module.exports = app;
