const mongoose = require("mongoose")

var levelsSchema = new mongoose.Schema({
    "name": String,
    "ytcode": String,
    "formerRank": Number,
    "removalDate": String,
    "minimumPercent": Number,
    "publisher": String,
    list: Array,
    progresses: Array
})

module.exports = mongoose.model("levels", levelsSchema)