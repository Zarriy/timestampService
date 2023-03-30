// init project
var express = require("express");
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/", (req, res) => {
  const date = Date.parse(new Date());
  const formate = new Date(Number(date)).toUTCString("en-US");
  res.json({ unix: date, utc: formate });
});

app.use("/api/:id", (req, res, next) => {
  let timeStamp = req.params.id;
  if (req.params.id.includes("-")) {
    timeStamp = Date.parse(req.params.id);
  }
  let params = Number(timeStamp);
  const date = new Date(params).toUTCString("en-US");
  req.time = { params, date };
  next();
});

app.get("/api/:id", (req, res) => {
  const date = req.time.date;
  if (date === "Invalid Date") {
    res.json({ error: date });
  }
  res.json({ unix: req.time.params, utc: date });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
