const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/sample";
const db = require("./db");
app.use(express.json());
app.use(cors());

mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) console.log(err);
    else console.log("mongoose connected");
  }
);
connection = mongoose.connection;
connection.on("open", () => {
  console.log("mongooo connected.........");
});

app.post("/postdetails", (req, res) => {
  let arr = [req.body.long, req.body.lat];
  const newdb = new db({
    schoolname: req.body.name,
    location: { coordinates: arr },
    disc: req.body.disc,
  });
  newdb.save((err, result) => {
    if (err) console.log(err);
    else {
      res.send(result);
    }
  });
});

app.put("/getschool", async (req, res) => {
  console.log(req.body.long, req.body.lat);
  await db.find(
    {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [req.body.long, req.body.lat],
          },
        },
      },
    },
    { schoolname: 1, _id: 0 },
    (err, rest) => {
      if (err) console.log(err);
      else res.send(rest);
    }
  );
});

app.get("/all", (req, res) => {
  db.find({}, (err, reslt) => {
    if (err) console.log(err);
    else {
      res.send(reslt);
    }
  });
});

app.get("/", (req, res) => {
  res.send("wellcome to new project");
});

app.listen(3020, () => {
  console.log("server is runing on 3020");
});
