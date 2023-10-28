// Funcões que são executadas durante o processamento da requisição
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.json());
}