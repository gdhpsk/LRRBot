const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://gdhpsk:${process.env.mongoPass}@gdhpsk-data.ldfbk.mongodb.net/test`)

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
