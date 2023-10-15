const fs = require("fs");

const data = "This is the data to write to the file 2.";

fs.writeFile("log.txt", data, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File written successfully!");
  }
});
