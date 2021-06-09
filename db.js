const mongoose = require("mongoose");
const mongodatabase = mongoose.Schema({
  schoolname: {
    type: String,
    required: true,
  },
  location: {
    coordinates: {
      type: [Number],
    },
    type: {
      type: String,
      default: "Point",
    },
  },
  disc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("schoolLoc", mongodatabase);
