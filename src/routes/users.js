const userServices = require('../services/users.js');

module.exports = (app) => {
    const userService = userServices(app);

    const findAll = async (req, res) => {
        try {
            const users = await userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    };

    const create = async (req, res) => {
        const user = req.body;
        try {
            const createdUser = await userService.create(user);
            res.status(201).json(createdUser[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    };

    return { findAll, create };
};
