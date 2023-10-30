module.exports = (app) => {
    const findAll = (req, res) => {
        app.db('users')
            .select()
            .then(result => res.status(200).json(result))
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Erro ao buscar usuários' });
            });
    };

    const create = async (req, res) => {
        try {
            const result = await app.db('users').insert(req.body, '*');
            res.status(201).json(result[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    };

    return { findAll, create };
}
