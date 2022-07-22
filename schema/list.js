const mongoose = require("mongoose")

var schema = new mongoose.Schema({
    name: String,
    ytcode: String,
    minimumPercent: Number,
    publisher: String,
    percent: Number,
    list: Array,
    progresses: Array
})

module.exports = mongoose.model("lrrlevels", schema)