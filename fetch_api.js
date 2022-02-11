const mongoose = require("mongoose")
const levels = require("./schema/list")

let lol = async (type) => {
    const body = {a: 1};
if(type == "list") {
    var alldata = await levels.find()
    var obj = alldata.reduce(function(acc, cur, i) {
        acc[alldata[i].name] = cur;
        return acc;
      }, {});
      return obj
} else if(type == "61plus") {
    
} else if(type == "leaderboard") {
    
}

}

module.exports = lol
