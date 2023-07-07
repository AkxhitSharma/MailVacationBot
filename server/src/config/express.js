const express = require('express');
const routes = require('../api/routes')
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/',routes)

module.exports= app;