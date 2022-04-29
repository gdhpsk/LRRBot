const mongoose = require("mongoose")

var opinionsArray = new mongoose.Schema({
    tag: String,
    above: String,
    below: String,
    progresses: String,
    comments: String
})

var opinionsSchema = new mongoose.Schema({
    _id: String,
    opinions: [opinionsArray]
})

module.exports = mongoose.model("opinions", opinionsSchema)