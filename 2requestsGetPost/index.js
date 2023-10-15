const http = require("http");
const PORT = 3000;
const server = http.createServer();
const friends = [
  { id: 0, name: "sagar" },
  {
    id: 1,
    name: "sagarRana",
  },
  {
    id: 2,
    name: "SagarSinghRana",
  },
];
server.on("request", (req, res) => {
  const item = req.url.split("/");
  if (req.method === "POST" && item[1] === "friend") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("request", friend);
      friends.push(JSON.parse(friend));
    });
    res.end();
  }
  if (req.method === "GET" && item[1] === "friend") {
    // res.writeHead(200,{
    //     'content-type' : 'application/json',
    // });
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    if (item.length === 3) {
      const friendIndex = +item[2];
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (item[1] === "messages") {
    res.setHeader("content-type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Hello brother</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode === 404;
    res.end();
  }
});
server.listen(PORT, () => {
  console.log(`Listining on port ${PORT}...`);
});
