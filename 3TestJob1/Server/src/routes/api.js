const express = require('express');
const api = express.Router();
const planetsRouter = require("./planets/planets.route");
const launchRouter = require("./launches/launches.route");
api.use("/launches", launchRouter);
api.use("/planets", planetsRouter);
module.exports = api;
