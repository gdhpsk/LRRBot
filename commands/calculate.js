const { SlashCommandBuilder } = require("@discordjs/builders")
const levels = require("../JSON/levels.json")
const leaderboard = require("../JSON/leaderboard.json")
const level_points = require("../point_calculator_stuff/level_points")
const prog_points = require("../point_calculator_stuff/leaderboard_progs_calculator")
const player_points = require("../leaderboard_point_calculator")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("calculate")
    .setDescription("Calculate how many points a player will have.")
.addBooleanOption(option => 
        option
        .setName("weighted") 
        .setDescription("Should the score be weighted like the real leaderboard?")
        .setRequired(true)
    )
.addStringOption((option2) =>
    option2
    .setName("addlevels")
    .setDescription("What level(s) do you want to add?")
    .setRequired(false)
)
.addStringOption((option) => 
    option
    .setName("addprogs")
    .setDescription("What progress(es) do you wanna add?")
    .setRequired(false)
).addStringOption((option) => 
option
.setName("profile")
.setDescription("what profile do you want to add on to?")
.setRequired(false)
),
    async execute(interaction, Discord, client) {
        var jkl = []
        var finaltext = ""
        var finalcount = 0
var numbero = 0
        var txt = interaction.options.getString("addlevels")
        let progs = interaction.options.getString("addprogs")
        let userprofile = interaction.options.getString("profile")
        if(!txt && !progs && !userprofile) return interaction.reply({content: `Fill in one of the values plz`, ephemeral: true})
let progsarray = ["none"]
let txtarray = ["none"]
if(txt) {
    txtarray = txt.split(", ")
}
if(progs) {
    progsarray = progs.split(", ")
}
       var count = 0

       function checkDuplicate(value) {
           let result = true;
        const s = new Set(value);
        if(value.length === s.size){
           result = false;
        }
        if(result) {
           return true
        } else {
          return false
        }
     }
     function checkDuplicateText(value) {
        let result = true;
     const s = new Set(value);
     if(value.length === s.size){
        result = false;
     }
     if(result) {
        for(let i = 0; i < value.length; i++) {
            for(let x = 0; x < value.length; x++) {
                if(value[x] == value[i] && i != x) {
                    return value[x]
                }
            }
        }
     } else {
       return false
     }
  }
     if(userprofile) {
        if(!leaderboard[userprofile]){
            interaction.reply({content: "Please enter a valid player!", ephemeral: true})
            count = 1
        } else {
            numbero = 1
            if(leaderboard[userprofile].progs[0] != "none" && leaderboard[userprofile].progs[0]) {
                for(let i = 0; i < leaderboard[userprofile].progs.length; i++) {
                    jkl.push(leaderboard[userprofile].progs[i].name)
                }
            }
            if(!txt && !progs) {
                interaction.reply({content: "What levels/progresses do you want to add to this player?", ephemeral: true})
                count = 1
            } 
        }
  }
     
     if(txt) {
       for(let i = 0; i < txtarray.length; i++) {
           if(!levels[txtarray[i]]) {
               interaction.reply({content: `The level **${txtarray[i]}** is not a valid level!`, ephemeral: true})
               count = 1
               break;
           } else {
             if(checkDuplicate(txtarray)) {
                interaction.reply({content: `The level **${checkDuplicateText(txtarray)}** is already on this list!`, ephemeral: true})
                count = 1
                break;
             } else {
               continue;
             }
           }
       }
    }
    if(progs) {
        var uj = []
       for(let i = 0; i < (progsarray.length/2); i++) {  
        let progsname = progsarray[i*2]
        uj.push(progsname)      
       }
       for(let i = 0; i < (progsarray.length/2); i++) {        
        let progspercent = progsarray[(i*2)+1]
        let progsname = progsarray[i*2]
        if(!levels[progsname]) {
            interaction.reply({content: `The level **${progsname}** is not a valid name!`, ephemeral: true})
            count = 1
            break;
        } else {
            if(checkDuplicate(uj)) {
                interaction.reply({content: `The level **${checkDuplicateText(uj)}** has already been entered!`, ephemeral: true})
                count = 1
                break;
            } else {
               if(isNaN(progspercent)) {
                   if(!Number.isInteger((progsarray.length/2))) {
                    interaction.reply({content: `Please input a percentage!`, ephemeral: true})
                    count = 1
                    break;
                   } else {
                interaction.reply({content: `**${progspercent}** is not a valid percentage!`, ephemeral: true})
                count = 1
                break;
                   }
               } else {
                   if(prog_points(progsname, progspercent) == 0 && numbero == 0) {
                    interaction.reply({content: `**${progsname}** is not a mainlist level!`, ephemeral: true})
                    count = 1
                    break;
                   } else {
                    if(prog_points(progsname, progspercent) == -1) {
                        interaction.reply({content: `**${progsname}**'s minimum percent is higher than ${progspercent}!`, ephemeral: true})
                        count = 1
                        break;
                       } else {
                        if(parseInt(progspercent) > 99 && numbero != 1) {
                            interaction.reply({content: `Input a number below 100 plz`, ephemeral: true})
                            count = 1
                            break;
                           } else {
                        if(txt) {
                            if(txtarray.includes(progsname)) {
                                interaction.reply({content: `The level **${progsname}** has already been entered!`, ephemeral: true})
                                count = 1
                                break;
                            } else {
                                continue;
                            }
                        }
                        continue;
                       } 
                    }
                   }
               }
            }
        }
    }
}
       var playerpoints = []
       var OML = 0
        if(count != 1) {
            
        if(userprofile) {
            let lev = Object.values(leaderboard)[Object.keys(leaderboard).indexOf(userprofile)].levels
            let prog = leaderboard[userprofile].progs
            
            var jkdf = []
            if(prog[0] != "none" && prog[0]) {
                for(let i = 0; i < prog.length; i++) {
                    jkdf.push(prog[i].name)
                }
            }
            var FGK = 0
            if(txt) {
            for(let i = 0; i < txtarray.length; i++) {
                if(lev.includes(txtarray[i])) {
                    interaction.reply({content: `**${txtarray[i]}** has already been beaten by this player!`, ephemeral: true})
                    FGK = 1
                    OML = 1
                    break;
                } else if(!lev.includes(txtarray[i]) && !jkdf.includes(txtarray[i])) {
                    playerpoints.push(level_points(txtarray[i]))
                    finalcount++
                    finaltext += `${finalcount}. ${txtarray[i]} 100% (#${Object.keys(levels).indexOf(txtarray[i])+1}) Unweighted Score: ${Math.round(1000*level_points(txtarray[i]))/1000}\n`
                } else if(jkdf.includes(txtarray[i])) {
                    playerpoints.push(level_points(txtarray[i]))
                    finalcount++
                    finaltext += `${finalcount}. ${txtarray[i]} 100% (#${Object.keys(levels).indexOf(txtarray[i])+1}) Unweighted Score: ${Math.round(1000*level_points(txtarray[i]))/1000}\n`
                } else {
                    continue;
                }
            }
        }
        if(progs) {
            for(let i = 0; i < (progsarray.length/2); i++) {
                let progsperc = progsarray[(i*2)+1]
                if(lev.includes(progsarray[i*2]) || jkdf.includes(progsarray[i*2])) {
                   if(numbero == 1 && parseInt(progsperc) == 101) {
                    continue;
                   } else if(numbero == 1 && parseInt(progsperc) != 101 && parseInt(progsperc) > 99) {
                    interaction.reply({content: `Please input a percent below 100! To remove a completion/progress, type "101" for your progress!`, ephemeral: true})
                    FGK = 1
                    OML = 1
                    break;
                   } else if(numbero == 1 && parseInt(progsperc) < 100) {
                   playerpoints.push(prog_points(progsarray[i*2], parseInt(progsperc)))
                   finalcount++
                   finaltext += `${finalcount}. ${progsarray[i*2]} ${progsperc}% (#${Object.keys(levels).indexOf(progsarray[i*2])+1}) Unweighted Score: ${Math.round(1000*prog_points(progsarray[i*2], progsperc))/1000}\n`
                    continue;
                   }
                } else {
                    if(prog_points(progsarray[i*2], progsperc) == 0) {
                        if(progsperc == 101) {
                            interaction.reply({content: `The level ${progsarray[i*2]} is not on ${userprofile}'s list of levels/progresses, therefore you cannot remove it!`, ephemeral: true})
                            FGK = 1
                            OML = 1
                            break;
                            } else {
                                interaction.reply({content: `The level ${progsarray[i*2]} is not mainlist!`, ephemeral: true})
                                FGK = 1
                                OML = 1
                                break;
                            }
                    } else {
                     if(!lev.includes(progsarray[i*2]) && !jkdf.includes(progsarray[i*2])) {
                        playerpoints.push(prog_points(progsarray[i*2], progsperc))
                        finalcount++
                       finaltext += `${finalcount}. ${progsarray[i*2]} ${progsperc}% (#${Object.keys(levels).indexOf(progsarray[i*2])+1}) Unweighted Score: ${Math.round(1000*prog_points(progsarray[i*2], progsperc))/1000}\n`
                        } else {
                             continue;
                        }
                    }
                }
            }
        }
        if(OML == 0) {
            if(lev[0] != "none" && lev[0]) {
            for(let i = 0; i < leaderboard[userprofile].levels.length; i++) {
                if(!txtarray.includes(lev[i]) && !progsarray.includes(lev[i])) {
                    playerpoints.push(level_points(lev[i]))
                    finalcount++
                    finaltext += `${finalcount}. ${lev[i]} 100% (#${Object.keys(levels).indexOf(lev[i])+1}) Unweighted Score: ${Math.round(1000*level_points(lev[i]))/1000}\n`
                }
            }
        }
        if(prog[0] != "none" && prog[0]) {
            for(let i = 0; i < leaderboard[userprofile].progs.length; i++) {
                if(!txtarray.includes(prog[i].name) && !progsarray.includes(prog[i].name)) {
                    playerpoints.push(prog_points(prog[i].name, prog[i].percent))
                    finalcount++
                    finaltext += `${finalcount}. ${prog[i].name} ${prog[i].percent}% (#${Object.keys(levels).indexOf(prog[i].name)+1}) Unweighted Score: ${Math.round(1000*prog_points(prog[i].name, prog[i].percent))/1000}\n`
                }
            }
        }
    }
} else {
    if(txt) {
        for(let i = 0; i < txtarray.length; i++) {
            playerpoints.push(level_points(txtarray[i]))
            finalcount++
            finaltext += `${finalcount}. ${txtarray[i]} 100% (#${Object.keys(levels).indexOf(txtarray[i])+1}) Unweighted Score: ${Math.round(1000*level_points(txtarray[i]))/1000}\n`
        }
    }
    if(progs) {
        for(let i = 0; i < (progsarray.length/2); i++) {
            let progspercent = progsarray[(i*2)+1]
    let progsname = progsarray[i*2]
            playerpoints.push(prog_points(progsname, parseInt(progspercent)))
            finalcount++
            finaltext += `${finalcount}. ${progsname} ${progspercent}% (#${Object.keys(levels).indexOf(progsname)+1}) Unweighted Score: ${Math.round(1000*prog_points(progsname, parseInt(progspercent)))/1000}\n`
        }
    }
}
        playerpoints.sort((a, b) => b - a)
        var bool = interaction.options.getBoolean("weighted")
        let weightedScore = playerpoints.reduce(
            (sum, currentValue, index) => sum + Math.pow(currentValue, Math.pow(0.95, index)),0);
            if(finaltext.length > 4000) {
                finaltext = `This profile has too many entries for it to be displayed, ${finalcount} to be exact.`
            }
            var embed = new Discord.MessageEmbed()
            .setTitle("CUSTOM PROFILE")
            .setDescription(finaltext)
            .setFooter(`Final (weighted) score: ${Math.round(1000*weightedScore)/1000} points`)
        if(userprofile) {
            embed.setTitle(`${userprofile}'s profile (edited)`)
        }
        if(bool == false) {
            let kj = playerpoints.reduce((alright, lol) => alright + lol)
            embed.setFooter(`Final (unweighted) score: ${Math.round(1000*kj)/1000} points`)
        }
        if(OML != 1) {
                interaction.reply({embeds: [embed]})
            }
       }
    }
}