module.exports = (app) => {

    const create = async (account) => {
        return app.db('accounts').insert(account, '*');
    };

    const findAll = () => {
        return app.db('accounts');
    }

    const find = (filter = {}) => {
        return app.db('accounts').where(filter).first();
    }

    const update = (id, account) => {
        return app.db('accounts').where({ id }).update(account, '*');
    }

    return { create, findAll, find, update };
};
