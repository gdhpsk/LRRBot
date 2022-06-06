const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("61plus")
    .setDescription("Shows info of any 61hz+ level on the LRR Demonslist.")
    .addStringOption((option) => 
    option
    .setName("level")
    .setDescription("What level do you want me to display?")
    .setRequired(false)),
    async execute(interaction, Discord, client) {
        var schema61 = require("../schema/61hertz")
        let everything = await schema61.find()
        everything.sort((a, b) => a._id - b._id)
        const levels = everything.reduce(function(acc, cur, i) {
            acc[everything[i].name] = cur;
            return acc;
          }, {});
        var numarray = []
        const embed = new EmbedBuilder()
        if(!interaction.options.getString("level")) {
            var txt = ""
            for(const key in levels) {
                txt += `[${key} by ${levels[key].publisher} (Placement: ${levels[key].ranking})](https://www.youtube.com/watch?v=${levels[key].ytcode})\n`
            }
            embed.setTitle("61hertz+ LRR List Levels").setDescription(txt)
            interaction.reply({embeds: [embed]})
        } else {
        if(!levels[interaction.options.getString("level")]) {
            await interaction.reply({content: "Please enter a valid level!", ephemeral: true})
        } else {
            var gay = interaction.options.getString("level")
                embed.setFooter(`Estimated Difficulty: ${levels[gay].ranking}`)
            
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
            txt = `Number of records: ${numarray.length}\n\nLink to the website: https://gdlrrlist-new.gdhpsk.repl.co/61plus.php`
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