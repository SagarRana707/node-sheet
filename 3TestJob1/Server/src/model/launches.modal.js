const launchesDataBase = require('./launches.mongo');
const planetsMongo = require("./planets.mongo");
const axios = require('axios');
const launched = {
  flightNumber: 100,
  mission: "oneMIssion",
  rocket: "oneRocket",
  launchDate: new Date("december 27,2030"),
  target: "Kepler-296 f",
  customer: ["oneCustomer", "twoCustumer"],
  upcoming: true,
  success: true,
};
async function addNewLaunches(launch){
   const existPlanet = await planetsMongo.findOne({ kepler_name : launch.target});
    if(!existPlanet){
        throw new Error('Planet not Exists Enter the walid planet to launch')
    }else{
const latestFlight = await getLatestFlightNumber() + 1;
   const newLaunch =  Object.assign(launch,{
        flightNumber : latestFlight,
        customer : ['Zero to Mastery','NASA'],
        upcoming : true,
        success: true
    });
  await  saveNewLaunches(newLaunch);}
}
async function getAllLaunches(skip,limit){
   return await launchesDataBase.find({}).skip(skip).limit(limit);
}
async function abortLaunchWithId(launchId){
const aborted = await launchesDataBase.updateOne({flightNumber : launchId},{success : false , upcoming : false});
 
 return aborted;
}
async function saveNewLaunches(launch){
await launchesDataBase.updateOne(
  { flightNumber: launch.flightNumber },
  launch,
  { upsert: true }
);
    }
async function getLatestFlightNumber(){
    const latestFlight = await launchesDataBase.findOne().sort({flightNumber : -1});
    if(!latestFlight){
        latestFlight = 100;
    }else{
        return latestFlight.flightNumber;
    }
}
saveNewLaunches(launched);
async function existLaunchWithId(id){
  return  await launchesDataBase.findOne({flightNumber : id});
};

const spaceX_api_url = "https://api.spacexdata.com/v4/launches/query";
const loadLaunchData = async () => {
  const responce = await axios.post(spaceX_api_url, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  if(responce.status !== 200){
    console.log('Failder to download the laounches');
    throw new Error('Launch data download failed');
  }
  const launchData = await responce.data.docs;
  for (let launchDoc of launchData) {
    const payLoads = launchDoc["payloads"];
    const customers = payLoads.flatMap((customer) => {
      return customer["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customer: customers,
    };
    saveNewLaunches(launch);
  }
};
module.exports = {
  addNewLaunches,
  existLaunchWithId,
  abortLaunchWithId,
  getAllLaunches,
  loadLaunchData,
};