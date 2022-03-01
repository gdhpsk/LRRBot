const mongoose = require("mongoose")

var leaderboard = new mongoose.Schema({
    nationality: String,
    name: String,
    levels: [],
    progs: []
})

module.exports = mongoose.model("leaderboard", leaderboard)