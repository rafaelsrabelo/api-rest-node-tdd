const app = require('express')();

app.get('/', (req, res) => {
    res.status(200).send();
})

app.get('/users', (req, res) => {
    const users = [
        {
            name: "Rafael Rabelo", email: "rafaelrabelodev@gmail.com"
        }
    ]
    res.status(200).json(users);
})

module.exports = app;