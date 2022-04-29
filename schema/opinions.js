const mongoose = require("mongoose")

var indexes =  new mongoose.Schema({
   level: String,
   index: String
})

var opinionsArray = new mongoose.Schema({
    tag: String,
    above: indexes,
    below: indexes,
    range: String,
    progresses: String,
    average: Number,
    comments: String,
  reliable: String
})

var opinionsSchema = new mongoose.Schema({
    _id: String,
    index: Number,
    opinions: [opinionsArray]
})

module.exports = mongoose.model("opinions", opinionsSchema)