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
        const result = await app.services.users.create(req.body);
        if(result.error) return res.status(400).json(result);
        res.status(201).json(result[0]);
    };

    return { findAll, create };
};
