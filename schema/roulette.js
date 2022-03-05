var mongoose = require("mongoose")

var rouletteSchema = new mongoose.Schema({
    levels: Object,
    percent: Object,
    config: Object 
})

module.exports = mongoose.model("roulette", rouletteSchema)