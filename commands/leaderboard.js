const { SlashCommandBuilder } = require("@discordjs/builders")
const levelsSchema = require("../schema/levels")
const leaderboardSchema = require("../schema/leaderboard")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows a user on LRR leaderboard.")
    .addStringOption((option) =>
        option
        .setName("user")
        .setDescription("Which profile do you want me to show?")
        .setRequired(false)
    ),
    async execute(interaction, Discord, client) {
        await interaction.deferReply()
        let lev = await levelsSchema.find()
        let lead = await leaderboardSchema.find()
        const leaderboard = lead.reduce(function(acc, cur, i) {
            acc[lead[i].name] = cur;
            return acc;
          }, {});
        const levels = lev.reduce(function(acc, cur, i) {
            acc[lev[i].name] = cur;
            return acc;
          }, {});
          const point = require("../point_calculator_stuff/leaderboard_point_calculator")
          if(!interaction.options.getString("user")) {
            var far = []
            let embeds = []
            const page = 20
            for(let key in leaderboard) {
                var df = point(key, levels, leaderboard)
                far.push({
                    name: key,
                    points: df
                })
            }
            let add = 0
            if(Math.floor(far.length/page) < far.length) {
                add = 1
            }
            for(let i = 0; i < Math.floor(far.length/page); i++) {
                let txt = ""
               for(let j = i*page; j < (i+1)*page; j++) {
                    txt += `${j+1}. ${far[j].name} (${far[j].points} points)\n\n`
               }
               embeds.push(new Discord.MessageEmbed().setTitle("GD LRR List Leaderboard").setDescription(txt).setFooter(`Page ${i+1}/${Math.floor(far.length/page)+add}`))
            }
            if(add = 1) {
                for(let i = Math.floor(far.length/page); i < Math.floor(far.length/page)+1; i++) {
                    let txt = ""
                   for(let j = i*page; j < far.length; j++) {
                        txt += `${j+1}. ${far[j].name} (${far[j].points} points)\n\n`
                   }
                   embeds.push(new Discord.MessageEmbed().setTitle("GD LRR List Leaderboard").setDescription(txt).setFooter(`Page ${i+1}/${Math.floor(far.length/page)+add}`))
                }
            }
            var bu = new Discord.MessageActionRow()
            let emoji = ["Back", "Next", "Skip Forward", "Skip Back"]
            for(let i = 0; i < 4; i++) {
                bu.addComponents(
                    new Discord.MessageButton()
                    .setCustomId(i.toString())
                    .setStyle("PRIMARY")
                    .setLabel(emoji[i])
                )
            }
            let whyudo = 0
            let smt = await interaction.editReply({embeds: [embeds[0]], components: [bu]})
            client.on("interactionCreate", async(buttonclick) => {
                if(!buttonclick.isButton()) return;
                if(smt.id != buttonclick.message.id) return
                switch (buttonclick.customId) {
                    case "0":
                        whyudo = whyudo > 0 ? --whyudo : embeds.length - 1;
                        await buttonclick.update({embeds: [embeds[whyudo]], components: [bu]})
                        break;
                    case "1":
                        whyudo = whyudo + 1 < embeds.length ? ++whyudo : 0;
                        await buttonclick.update({embeds: [embeds[whyudo]], components: [bu]})
                        break; 
                    case "2":
                        whyudo = embeds.length-1
                        await buttonclick.update({embeds: [embeds[whyudo]], components: [bu]})
                        break;
                     case "3":
                        whyudo = 0
                        await buttonclick.update({embeds: [embeds[whyudo]], components: [bu]})
                        break;
                }
            })
          } else {
        if(!leaderboard[interaction.options.getString("user")]) {
            await interaction.editReply({content: "Please enter a valid profile!", ephemeral: true})
        } else {
            var counte = ""
            var gay = interaction.options.getString("user")
            var far = []
            for(let key in leaderboard) {
                var df = point(key, levels, leaderboard)
                if(df != 0) {
                far.push({
                    name: key,
                    points: df
                })
            }
            }
            far.sort((a, b) => b.points - a.points)
           for(let i = 0; i < far.length; i++) {
                if(far[i].name == gay) {
                    counte = `#${i+1} - `
                    break;
                }
            }
            var ku = 0
            var uk = 0
            var txtList = ""
            var txtExtra = ""
            var txtProgs = ""
            var nationality = ""
            if(leaderboard[gay].nationality) {
                nationality = `**NATIONALITY**: ${leaderboard[gay].nationality.replace(/_/g, " ")}\n\n`
            }
            if(leaderboard[gay].levels[0] != "none" && leaderboard[gay].levels[0]) {
                for(let i = 0; i < leaderboard[gay].levels.length; i++) {
                    leaderboard[gay].levels.sort((a, b) => Object.keys(levels).indexOf(a) - Object.keys(levels).indexOf(b))
                    var count = Object.keys(levels).indexOf(leaderboard[gay].levels[i])+1
                    if(count > 150) {
                        txtExtra += `${i+1}. *${leaderboard[gay].levels[i]}*\n`
                        ku += 1
                    } else {
                        txtList += `${i+1}. ${leaderboard[gay].levels[i]} (#${count})\n`
                        ku += 1
                    }
                }
                if(txtExtra == "") {
                    txtExtra = "none.\n"
                }
                if(txtList == "") {
                    txtList = "none.\n"
                }
            } else {
                if(txtExtra == "") {
                    txtExtra = "none.\n"
                }
                if(txtList == "") { 
                    txtList = "none.\n"
                }
            }
            if(leaderboard[gay].progs[0] != "none" && leaderboard[gay].progs[0]) {
                for(let i = 0; i < leaderboard[gay].progs.length; i++) {
                    leaderboard[gay].progs.sort((a, b) => Object.keys(levels).indexOf(a.name) - Object.keys(levels).indexOf(b.name))
                    var count = Object.keys(levels).indexOf(leaderboard[gay].progs[i].name)+1
                        txtProgs += `${i+1}. ${leaderboard[gay].progs[i].name} ${leaderboard[gay].progs[i].percent}% (#${count})\n`
                        uk += 1
                }
            } else {
                txtProgs = "none.\n"
            }
            const embed = new Discord.MessageEmbed()
            .setTitle(`${counte}${gay}'s profile (${point(gay, levels, leaderboard)} points):`)
            .setDescription(`${nationality}**COMPLETIONS**\n\n${txtList}\n**COMPLETED LEGACY LEVELS**\n\n${txtExtra}\n**PROGRESSES**\n\n${txtProgs}`)
            .setFooter(`${ku} completions, ${uk} progresses`)
            await interaction.editReply({embeds: [embed]})
        }
    }
    }
}