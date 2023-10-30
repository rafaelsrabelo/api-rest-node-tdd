module.exports = (app) => {
    const create = async (req, res) => {
        const result = await app.services.accounts.create(req.body).then((result) => {
            if (result.error) return res.status(400).json(result);
            return res.status(201).json(result[0]);
        })
    };

    return { create };
};