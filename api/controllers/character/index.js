// Character routes for API

const server = require('../../server');

module.exports = function () {
    server.app.post('/character', (req, res) => { post(req, res); });
};

const controller = require('./controller');

function post(req, res) {
    let accountId = req.headers[server.accountIdHeader];
    var model = req.body;
    model[server.accountIdHeader] = accountId;
    controller.create(model, (character, err) => {
        if (err) {
            res.status(404);
            console.log(err);
            res.send(err);
        } else {
            res.json(character);
        }
    });
}