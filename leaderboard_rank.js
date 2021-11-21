const points = require("./leaderboard_point_calculator")
const players = require("./JSON/leaderboard.json")
let lol = (player) => {
    var array = []
    var real = []
    for(let i = 0; i < Object.keys(players).length; i++) {
        var object = {
            name: player,
            point: points(player)
        }
        array.push(object)
    }
    array.sort((a, b) => a.point - b.point)
    for(let i = 0; i < array.length; i++) {
        real.push(array[i].name)
    }
    return real.indexOf(player)+1
}
module.exports = lol