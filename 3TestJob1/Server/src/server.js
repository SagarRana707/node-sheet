const app = require('./app');
const http = require('http');
require('dotenv').config();
const {
  toGetStorePlanetsInArray
} = require("./model/planets.model");
const mongoConnect = require('./services/mongo');
const { loadLaunchData } = require('./model/launches.modal');
const PORT = process.env.PORT || 8002;
const server = http.createServer(app);
async function serverStart(){
  await mongoConnect();
await toGetStorePlanetsInArray();
await loadLaunchData();
server.listen(PORT, () => {
  console.log(PORT);})
}
serverStart();

