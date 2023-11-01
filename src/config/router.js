const express = require('express');

module.exports = (app) => {
    app.use('/auth', app.routes.auth);
    app.route('/api/v1').get((req, res) => {
        res.status(200).json({
          message: `Bem vindo à API da versão 1 da Rumi`
        });
      });
      
    const protectedRouter = express.Router();

    protectedRouter.use('/users', app.routes.users);
    protectedRouter.use('/accounts', app.routes.accounts);

    app.use('/', app.config.passport.authenticate(), protectedRouter);
}