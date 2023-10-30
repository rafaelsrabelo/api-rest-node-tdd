module.exports = (app) => {
    const create = async (req, res) => {
        app.services.accounts.create(req.body)
            .then((result) => {
                if (result.error) return res.status(400).json(result);
                return res.status(201).json(result[0]);
            })
    };

    const getAll = (req, res) => {
        app.services.accounts.findAll()
            .then(result => res.status(200).json(result));
    }

    const get = (req, res) => {
        app.services.accounts.find({ id: req.params.id }).then(result => res.status(200).json(result));
    }

    const update = (req, res) => {
        app.services.accounts.update(req.params.id, req.body)
            .then(result => res.status(200).json(result[0]));
    }

    return { create, getAll, get, update };
};