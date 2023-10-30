const ValidationError = require("../errors/ValidationError");

module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db('users').where(filter).select();
    };

    const create = async (user) => {
        if(!user.name) return { error: 'O nome é obrigatório' };
        if(!user.email) return { error: 'O email é obrigatório'};
        if(!user.password) return { error: 'A senha é obrigatória'};
        const  userDb = await findAll({email: user.email});
        if(userDb && userDb.length > 0) return { error: 'Já existe um usuário com esse email'};
        return app.db('users').insert(user, '*');
    };

    return { findAll, create };
};
