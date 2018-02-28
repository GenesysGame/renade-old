// Account routes for API

module.exports = function (app) {
    app.post('/account', (req, res) => { post(req, res); });
};

const account = require('./account');

function post(request, response) {
    account.create(request.body, (account, error) => {
        if (error) { 
            response.send(error); 
        } else if (account) {
            response.json(account);
        } else {
            response.send("Unknown error");
        }
    });
}