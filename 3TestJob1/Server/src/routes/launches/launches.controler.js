const launchModel = require('../../model/launches.modal');
const { getPagination } = require('../../services/query');

 async function getLaunchPlanet(req, res) {
  const {skip,limit}= getPagination(req.query);
 return  res.status(200).json(await launchModel.getAllLaunches(skip,limit));
}
async function httpAddNewLaunch(req,res){
const launch = req.body;
launch.launchDate = new Date(launch.launchDate);
if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target){
  return res.status(400).json({
    error : 'Missing some required properties for rocket launch'
  })
}
await launchModel.addNewLaunches(launch);
if(isNaN(launch.launchDate)){
  return res.status(400).json(  
   { error : 'Invalid Launch Date'}
  )
}
return res.status(201).json(launch);
}
function httpAbortLaunch(req,res){
const launchId = Number(req.params.id);
if(!launchModel.existLaunchWithId(launchId)){
 return res.status(400).json({
    error : "this Launch Not found"
  })
}
else{
  const aborted = launchModel.abortLaunchWithId(launchId);
 return res.status(200).json(aborted);
}
}
module.exports = {
  getLaunchPlanet,
 httpAddNewLaunch,
 httpAbortLaunch
};
