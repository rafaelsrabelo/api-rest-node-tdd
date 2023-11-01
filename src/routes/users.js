const userServices = require('../services/users.js');
const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    const userService = userServices(app);

    router.get('/', (req, res) => {
        app.services.users.findAll().then(result => res.status(200).json(result))
        .catch(err => next(err));
    });

    router.post('/', async (req, res) => {
        const result = await app.services.users.create(req.body);
        if(result.error) return res.status(400).json(result);
        res.status(201).json(result[0]);
    });

    return router;
};
