module.exports = (app) => {
    // Rotas que não necessitam de autenticação
    app.route('/auth/signin').post(app.routes.auth.signin);
    app.route('/auth/signup').post(app.routes.users.create);

    // Rotas que necessitam de autenticação
    const protectedRouter = express.Router();

    protectedRouter.use(app.config.passport.authenticate());

    protectedRouter.route('/users')
        .get(app.routes.users.findAll)
        .post(app.routes.users.create);

    protectedRouter.route('/accounts')
        .post(app.routes.accounts.create)
        .get(app.routes.accounts.getAll);

    protectedRouter.route('/accounts/:id')
        .get(app.routes.accounts.get)
        .put(app.routes.accounts.update);

    app.use('/', protectedRouter);
}
