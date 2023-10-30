module.exports = (app) => {

    const create = async (account) => {
        return app.db('accounts').insert(account, '*');
    };

    const findAll = () => {
        return app.db('accounts');
    }

    return { create, findAll };
};
