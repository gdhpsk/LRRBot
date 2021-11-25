const { SlashCommandBuilder } = require("@discordjs/builders")
const levels = require("../JSON/levels.json")
const points = require("../point_calculator_stuff/levels_point_calculator")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Shows info of any level on the LRR Demonslist. This will be updated every week")
    .addStringOption((option) => 
    option
    .setName("level")
    .setDescription("What level do you want me to display?")
    .setRequired(true)),
    async execute(interaction, Discord, client) {
        var numarray = []
        const embed = new Discord.MessageEmbed()
        if(!levels[interaction.options.getString("level")] && interaction.options.getString("level") != "generate") {
            await interaction.reply({content: "Please enter a valid level!", ephemeral: true})
        } else {
            var act = interaction.options.getString("level")
            var gay = ""
            if(act == "generate") {
                var um = Math.floor(Math.random() * Object.keys(levels).length-1)
                gay = Object.keys(levels)[um]
                embed.setAuthor(`${interaction.user.tag} generated a level!`)
            } else {
                gay = act
            }
            if(levels[gay].minimumPercent) {
                embed.setFooter(`The minimum percentage requirement for this level is ${levels[gay].minimumPercent}%.\nNumber of points given (completion): ${points(gay)}`)
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
            if(levels[gay].progresses && Object.keys(levels).indexOf(gay) < 75) {
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
        var gg = "legacy"
        if(Object.keys(levels).indexOf(gay) < 75) {
            gg = "index"
        } else if(Object.keys(levels).indexOf(gay) > 74 && Object.keys(levels).indexOf(gay) < 150) {
            gg = "extended"
        }
        if(txt.length > 4000) {
            txt = `Number of 61hz> records: ${numarray.filter(v => parseInt(v) < 61).length}\n\nNumber of 61-75hz records: ${numarray.filter(v => parseInt(v) > 60).length}\n\nNumber of Mobile records: ${numarray.filter(v => v == "Mobile").length}\n\nNumber of Points Given: ${points(gay)}\n\nLink to the website: https://gdlrrlist.cf/${gg}.php`
         }
            embed.setTitle(`#${Object.keys(levels).indexOf(gay)+1} - ${gay} by ${levels[gay].publisher}`)
            embed.setURL(`https://www.youtube.com/watch?v=${levels[gay].ytcode}`)
            embed.setImage(`https://i.ytimg.com/vi/${levels[gay].ytcode}/mqdefault.jpg`)
            embed.setDescription(txt)
            await interaction.reply({embeds: [embed]})
    }
        }
    }