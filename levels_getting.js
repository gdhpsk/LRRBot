
const levels = require("./JSON/levels.json")
var obj = []
for(const key in levels) {
    var objectval = levels[key]
    var txt = [`${objectval.minimumPercent}`, `${objectval.progresses}`]
    if(!objectval.minimumPercent) {
        txt[0] = false
    }
    if(!objectval.progresses) {
        txt[1] = false
    }
    obj.push({
        name: objectval.name,
        ytcode: objectval.ytcode,
        minimumPercent: txt[0],
        publisher: objectval.publisher,
        list: objectval.list,
        progresses: txt[1]
    })
}


module.exports = obj[0].list