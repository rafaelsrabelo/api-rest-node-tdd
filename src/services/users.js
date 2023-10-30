module.exports = (app) => {
    const findAll = () => {
        return app.db('users').select();
    };

    const create = (user) => {
        if(!user.name) return { error: 'O nome é obrigatório'};
        
        return app.db('users').insert(user, '*');
    };

    return { findAll, create };
};
