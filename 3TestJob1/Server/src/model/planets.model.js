const planets = require("./planets.mongo");
const axios = require('axios');
const { parse } = require("csv-parse");
const fs = require("fs");
const habitatData = [];

function isHabitatPlanet(planet) {
  if (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  ) {
    return [
      planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6,
    ];
  }
}

const toGetStorePlanetsInArray = async() => {
  new Promise((resolve , reject) => {
    fs
      .createReadStream("Kepler_data.csv")
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", async(res) => {
        if (isHabitatPlanet(res)) {
          await savePlanets(res);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async() => {
        console.log( (await allPlanets()).length,` is length`);
      })
      resolve();
    })}
const savePlanets = async(planet) => {
 try{ await planets.updateOne(
   { kepler_name: planet.kepler_name },
   { kepler_name: planet.kepler_name },
   { upsert: true }
 );}
  catch(err){
console.log(`failed to save planets: ${err}`);
  }
}
const allPlanets = async() => {
 return await planets.find();
}
module.exports = { toGetStorePlanetsInArray, allPlanets};