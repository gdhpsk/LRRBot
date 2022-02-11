const mongoose = require("mongoose")

let lol = async (type) => {
    const body = {a: 1};
if(type == "list") {
    var alldata = await mongoose.model("lrrlevels").find()
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
