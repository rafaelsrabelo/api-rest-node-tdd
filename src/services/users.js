module.exports = (app) => {
    const findAll = () => {
        return app.db('users').select();
    };

    const create = (user) => {
        return app.db('users').insert(user, '*');
    };

    return { findAll, create };
};
