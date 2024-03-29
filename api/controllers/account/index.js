// Account routes for API

const express = require('express');
const server = require('../../server');

module.exports = function () {
    server.app.put('/account', (req, res) => { put(req, res); }); //register
    server.app.post('/account', (req, res) => { post(req, res); }); //login
    server.app.get('/account', (req, res) => { getContinue(req, res); }); //fast login
};

const controller = require('./controller');

function put(request, response) {
    let ip = request.headers[server.ipHeader];
    controller.create(request.body, ip,  (account, error) => {
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

function post(request, response) {
    let accountId = request.headers[server.accountIdHeader];
    let ip = request.headers[server.ipHeader];
    let body = request.body;
    console.log(body);
    let callback = function(account, error) {
        if (!account) {
            let err = (error) ? error : "Unknown error";
            response.status(404);
            response.send(err);
        } else {
            response.json(account);
        }
    }
    if (!body.username || !body.password) {
        controller.fetchById(accountId, callback);
    } else {
        controller.fetch(body.username, body.password, ip, callback);
    }
}

function getContinue(request, response) {
    let ip = request.headers[server.ipHeader];
    let body = request.query;
    controller.fastFetch(body.username, ip, (account, error) => {
        if (error) {
            response.status(401);
            response.send(error);
        } else if (account) {
            response.json(account);
        } else {
            response.status(404);
            response.send("Account not found");
        }
    });
}