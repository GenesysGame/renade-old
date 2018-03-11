// Account routes for API

const express = require('express');
const server = require('../../server');

module.exports = function () {
    server.app.post('/account', (req, res) => { post(req, res); });
    server.app.get('/account', (req, res) => { get(req, res); });
};

const controller = require('./controller');

function post(request, response) {
    controller.create(request.body, (account, error) => {
        if (error) { 
            response.status(401);
            console.log(error);
            response.send(error); 
        } else if (account) {
            response.json(account);
        } else {
            response.status(401);
            response.send("Unknown error");
        }
    });
}

function get(request, response) {
    let accountId = request.headers[server.accountIdHeader];
    let query = request.query;
    console.log(query);
    let callback = function(account, error) {
        if (!account) {
            let err = (error) ? error : "Unknown error";
            response.status(404);
            response.send(err);
        } else {
            response.json(account);
        }
    }
    if (!query.username || !query.password) {
        controller.fetchById(accountId, callback);
    } else {
        controller.fetch(query.username, query.password, callback);
    }

}