
let lol = (level, levels) => {
    var counter = Object.keys(levels).indexOf(level)+1
    let score = 0
    if(counter > 150) {
      score = 0
    } else {
    if(counter-1 < 50){
        score = 50.0 / (Math.pow(Math.E, 0.001 * counter)) * Math.log((1 / (0.008 * counter)));
      }else if(counter-1 >= 50 && counter-1 < 100){
        score = 50.0 / (Math.pow(Math.E, 0.01 * counter)) * Math.log((210 / (Math.pow(counter, 1.001))));
      }else{
        score = 50.0 / (Math.pow(Math.E, 0.01 * counter)) * Math.log((3.3 / Math.pow(counter, .1)));
      }
    }
      return score
}
module.exports = lol