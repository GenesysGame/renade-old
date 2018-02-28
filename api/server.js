#!/usr/bin/env node
'use strict';

const port = 8002;

const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

require('./account/routes')(app, db);

app.listen(8002);
