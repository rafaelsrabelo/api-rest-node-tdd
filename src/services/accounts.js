module.exports = (app) => {

    const create = async (account) => {
        return app.db('accounts').insert(account, '*');
    };

    return { create };
};
