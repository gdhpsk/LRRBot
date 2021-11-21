const points = require("./leaderboard_point_calculator")
const players = require("./JSON/leaderboard.json")
    var array = []
    for(let i = 0; i < Object.keys(players).length; i++) {
        var object = {
            name: player,
            point: points(player)
        }
        array.push(object)
    }
    array.sort((a, b) => a.point - b.point)

module.exports = array