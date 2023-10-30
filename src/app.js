const express = require('express');
const app = express();
const consign = require('consign');
const knex = require('knex');

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
    }}
);

app.db = db;

consign({'cwd': 'src'})
    .include('./config/middlewares.js')
    .then('./routes')
    .then('./config/routes.js')
    .into(app);

app.get('/', (req, res) => {
    res.status(200).json({
      message: "Bem vindo a rumi API"
    });
});

module.exports = app;
