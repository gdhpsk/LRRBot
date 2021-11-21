const { SlashCommandBuilder } = require("@discordjs/builders")
const levels = require("../JSON/61hertz+.json")
const points = require("../levels_point_calculator")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("61plus")
    .setDescription("Shows info of any 61hz+ level on the LRR Demonslist. This will be updated every week")
    .addStringOption((option) => 
    option
    .setName("level")
    .setDescription("What level do you want me to display?")
    .setRequired(true)),
    async execute(interaction, Discord, client) {
        var numarray = []
        const embed = new Discord.MessageEmbed()
        if(!levels[interaction.options.getString("level")]) {
            await interaction.reply({content: "Please enter a valid level!", ephemeral: true})
        } else {
            var gay = interaction.options.getString("level")
            if(levels[gay].minimumPercent) {
                embed.setFooter(`The minimum percentage requirement for this level is ${levels[gay].minimumPercent}%.\nEstimated Difficulty: ${levels[gay].ranking}`)
            }
            var txt = "**COMPLETIONS**\n\n"
            for(let i = 0; i < levels[gay].list.length; i++) {
                var list = levels[gay].list[i]
                var ar = [`${list.hertz}hz`]
                if(list.name == "Removed") {
                    txt = `Removed${list.link}`
                } else {
                    if(list.hertz == "M") {
                        ar[0] = "Mobile"
                       }
                       txt += `- ${list.name} beat [${gay} on ${ar[0]}.](${list.link})\n\n`
                       numarray.push(ar[0])
                }
            }
            if(levels[gay].progresses) {
                if(levels[gay].progresses[0] != "none") {
                    txt += "**PROGRESSES**\n\n"
            for(let i = 0; i < levels[gay].progresses.length; i++) {
                var progresses = levels[gay].progresses[i]
                var ar = [`${progresses.hertz}hz`]
                 if(progresses.hertz == "M") {
                     ar[0] = "Mobile"
                    }
                    txt += `- ${progresses.name} got ${progresses.percent}% on [${gay} on ${ar[0]}.](${progresses.link})\n\n`
                    numarray.push(ar[0])
                }
            }
        }
        if(txt.length > 4000) {
            txt = `Number of records: ${numarray.length}\n\nLink to the website: https://gdlrrlist.cf/61plus.php`
         }
            embed.setTitle(`#${Object.keys(levels).indexOf(gay)+1} - ${gay} by ${levels[gay].publisher}`)
            embed.setURL(`https://www.youtube.com/watch?v=${levels[gay].ytcode}`)
            embed.setImage(`https://i.ytimg.com/vi/${levels[gay].ytcode}/mqdefault.jpg`)
            embed.setDescription(txt)
            await interaction.reply({embeds: [embed]})
    }
        }
    }