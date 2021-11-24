const got = require("got")
const levels = require("./JSON/levels.json")
var obj = {}
for(let i = 0; i < Object.keys(levels).length; i++) {
    var objectval = Object.values(levels)[i]
    var txt = [`${objectval.minimumPercent}`, `${objectval.progresses}`]
    if(!objectval.minimumPercent) {
        txt[0] = false
    }
    if(!objectval.progresses) {
        txt[1] = false
    }
    obj[objectval.name] += {
        name: objectval.name,
        ytcode: objectval.ytcode,
        minimumPercent: txt[0],
        publisher: objectval.publisher,
        list: objectval.list,
        progresses: txt[1]
    }
}
module.exports = "LOL"
