module.exports = (app) => {

    const create = async (account) => {
        if(!account.name) return { error: 'Nome é um atributo obrigatório'};
        const accDb = await find({ name: account.name, user_id: account.user_id})
        if(accDb) return { error: 'Já existe uma conta com esse nome'}
        return app.db('accounts').insert(account, '*');
    };

    const findAll = (user_id) => {
        return app.db('accounts').where({user_id});
    }

    const find = (filter = {}) => {
        return app.db('accounts').where(filter).first();
    }

    const update = (id, account) => {
        return app.db('accounts').where({ id }).update(account, '*');
    }

    const remove = (id) => {
        return app.db('accounts').where({ id }).del();
    };

    return { create, findAll, find, update, remove };
};
