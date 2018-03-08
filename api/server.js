#!/usr/bin/env node
'use strict';

const port = 8002;

const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const pass = require('./helpers/password');

const accountIdHeader = 'accountId';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    let token = req.get('X-Token');
    pass.decryptToken(token, id => {
        req.headers[accountIdHeader] = id;
        next();
    });
});

module.exports = {
    app: app,
    db: db,
    accountIdHeader: accountIdHeader
};

require('./controllers/account')();
require('./controllers/character')();
require('./controllers/animations')();

app.listen(8002);
