const fs = require("fs");
const http = require("http");
const multer = require("multer");
const PORT = 3000;

const upload = multer({ dest: "uploads/" }); // Specify the upload destination folder

const server = http.createServer();

server.on("request", (req, res) => {
  const item = req.url.split("/");
  if (req.method === "GET") {
     res.statusCode = 200;
     if (!item[1]) {
       const htmlFile = fs.readFileSync("./src/home.html", "utf8");
       res.end(htmlFile);
     } else if (item[1] === "user-data-collector") {
       const htmlFile = fs.readFileSync("./src/about.html", "utf8");
       res.end(htmlFile);
     } else {
       const htmlFile = fs.readFileSync("./src/notFound.html", "utf8");
       res.end(htmlFile);
     }
  } else if (req.method === "POST") {
    if (item[1] === "formSubmit") {
      upload.single("image")(req, res, (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          res.statusCode = 400;
          res.setHeader("Content-Type", "text/plain");
          res.end("File upload failed.");
          return;
        }

        // Check if the uploaded file is in JPG or PNG format
        const file = req.file;
        if (file) {
          if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            // File is in the allowed format, you can process it here
            console.log("File uploaded:", file.originalname);
          } else {
            // File is not in the allowed format
            fs.unlinkSync(file.path); // Remove the uploaded file
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end(
              "File format not supported. Please upload a JPG or PNG file."
            );
            return;
          }
        }
        // Respond to the client
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("File received and processed successfully.");
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Not Found");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
