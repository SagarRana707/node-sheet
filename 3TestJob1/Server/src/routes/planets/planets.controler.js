const {allPlanets} = require("../../model/planets.model");

async function httpGetAllPlanet(req, res) {
  const allPlanetss = await allPlanets();
 return await res
   .status(200)
   .json(allPlanetss)
}
module.exports = {
  httpGetAllPlanet,
};
