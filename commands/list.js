const { SlashCommandBuilder } = require("@discordjs/builders")
const points = require("../point_calculator_stuff/levels_point_calculator")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Shows info of any level on the LRR Demonslist. This will be updated every week")
    .addStringOption((option) => 
    option
    .setName("level")
    .setDescription("What level do you want me to display?")
    .setRequired(false)),
    async execute(interaction, Discord, client) {
        const levels = require("../JSON/levels.json")
        var numarray = []
        const embed = new Discord.MessageEmbed()
        if(!interaction.options.getString("level")) {
            var array = []
            var page = 25
            var fr = ""
            for(let i = 0; i < Math.floor(Object.keys(levels).length/page); i++) {
                var addition = 0
                if(!Number.isInteger(Object.keys(levels).length/page)) {
                    addition = 1
                }
                var txt = ""
                var number = page * i
                for(let j = number; j < (number + page); j++) {
                    let smt = [`${j+1}. `]
                    if(j > 149) {
                        smt[0] = ""
                    }
                    txt += `[${smt[0]}${Object.values(levels)[j].name} by ${Object.values(levels)[j].publisher}](https://www.youtube.com/watch?v=${Object.values(levels)[j].ytcode})\n`
                }
                array.push(new Discord.MessageEmbed().setDescription(txt).setTitle("Low Refresh Rate List Levels"))
            }
            if(array.length*page != Object.keys(levels).length) {
                for(let j = (array.length * page); j < Object.keys(levels).length; j++) {
                    fr += `[${Object.values(levels)[j].name} by ${Object.values(levels)[j].publisher}](https://www.youtube.com/watch?v=${Object.values(levels)[j].ytcode})\n`
                }
                array.push(new Discord.MessageEmbed().setDescription(fr).setTitle("Low Refresh Rate List Levels"))
            }
            await interaction.reply({embeds: [array[0]]})

            let embedMessage = await interaction.fetchReply()

            const emoji = ["⏪", "⏩"]
        for(let i = 0; i < emoji.length; i++) {
            embedMessage.react(emoji[i])
        }
        var whyudo = 0

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == interaction.channel.id) {
                if (reaction.emoji.name === emoji[0]) {
                    whyudo = whyudo > 0 ? --whyudo : array.length - 1;
                    reaction.users.remove(user)
                   await embedMessage.editReply(array[whyudo]) 
                }
                if (reaction.emoji.name === emoji[1]) {
                    whyudo = whyudo + 1 < array.length ? ++whyudo : 0;
                    reaction.users.remove(user)
                   await smt.editReply(array[whyudo])
                }
            } else {
                return;
            }
 
        });
        } else {
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
    }