const mongoose = require("mongoose")

var levelsSchema = new mongoose.Schema({
    _id: Number,
    "name": String,
    "ytcode": String,
    "formerRank": Number,
    "removalDate": String,
    percent: Number,
    skipped: Boolean,
    "minimumPercent": Number,
    "publisher": String,
    list: Array,
    progresses: Array
})

module.exports = mongoose.model("levels", levelsSchema)