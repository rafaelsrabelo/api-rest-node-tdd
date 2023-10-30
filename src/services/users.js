const bcrypt = require('bcrypt');

module.exports = (app) => {
    const findAll = () => {
        return app.db('users').select(['id','name','email']);
    };

    const findOne = (filter = {}) => {
        return app.db('users').where(filter).first();
    };

    const getPasswordHash = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    const create = async (user) => {
        if(!user.name) return { error: 'O nome é obrigatório' };
        if(!user.email) return { error: 'O email é obrigatório'};
        if(!user.password) return { error: 'A senha é obrigatória'};

        const  userDb = await findOne({email: user.email});
        if(userDb) return { error: 'Já existe um usuário com esse email'};

        const newUser = { ...user };
        newUser.password = getPasswordHash(user.password);
        return app.db('users').insert(newUser, ['id','name','email']);
    };

    return { findAll, create, findOne };
};
