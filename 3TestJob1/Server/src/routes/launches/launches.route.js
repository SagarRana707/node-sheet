const express = require("express");
const getAllPlanets = require("./launches.controler");
const launchesRoute = express.Router();
launchesRoute.get("/", getAllPlanets.getLaunchPlanet);
launchesRoute.post("/", getAllPlanets.httpAddNewLaunch);
launchesRoute.delete("/:id", getAllPlanets.httpAbortLaunch);
module.exports = launchesRoute;