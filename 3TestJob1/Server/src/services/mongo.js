const mongoose = require('mongoose');
async function mongoConnect(){
  const mongo_url =process.env.MONGO_URL;

   mongoose.connection.once("open", () => {
    console.log("MongoDb Connection is ready");
  });
   mongoose.connection.on("error", (err) => {
    console.error(err);
  });
   mongoose.set("strictQuery", false);
 await  mongoose.connect(mongo_url);
}
module.exports = mongoConnect;