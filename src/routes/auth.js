const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'Secret';

module.exports = (app) => {
    const signin = (req, res, next) => {
        app.services.users.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: 'Usuário ou senha inválida' });
                }

                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    };

                    const token = jwt.sign(payload, secret);
                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ error: 'Usuário ou senha inválida' });
                }
            })
            .catch(err => next(err));
    };

    return { signin };
}
