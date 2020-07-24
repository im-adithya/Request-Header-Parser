// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const port = 4000
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5","software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}
//I can get the IP address, preferred languages (from header Accept-Language) and system infos (from header User-Agent) for my device.
// your first API endpoint...
app.get("/api/whoami", function(req, res) {
    
  res.json({
    ipaddress: req.header("x-forwarded-for").split(",")[0],
    language: req.header("Accept-Language"),
    software: req.header("User-Agent")
  });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))