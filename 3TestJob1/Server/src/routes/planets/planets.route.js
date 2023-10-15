const express = require("express");
const { httpGetAllPlanet } = require("./planets.controler");
const planetsRoute = express.Router();
planetsRoute.get("/",httpGetAllPlanet);

module.exports = planetsRoute;
