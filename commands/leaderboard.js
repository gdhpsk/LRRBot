const { SlashCommandBuilder } = require("@discordjs/builders")
const leaderboard = require("../JSON/leaderboard.json")
const levels = require("../JSON/levels.json")
const point = require("../leaderboard_point_calculator")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows a user on LRR leaderboard. WIll be updated every week.")
    .addStringOption((option) =>
        option
        .setName("user")
        .setDescription("Which profile do you want me to show?")
        .setRequired(true)
    ),
    async execute(interaction, Discord, client) {
        if(!leaderboard[interaction.options.getString("user")]) {
            await interaction.reply({content: "Please enter a valid profile!", ephemeral: true})
        } else {
            var counte = 0
            var far = []
            for(let key in leaderboard) {
                var df = point(key)
                var obj = {
                    name: key,
                    points: df
                }
                far.push(obj)
            }
            far.sort((a, b) => a.points - b.points)
            for(let i = 0; i < far.length; i++) {
                if(far[i].name == gay) {
                    counte = i+1
                    break;
                }
            }
            var ku = 0
            var uk = 0
            var gay = interaction.options.getString("user")
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
                    if(count > 149) {
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
            .setTitle(`${gay}'s profile (${point(gay)} points):`)
            .setDescription(`${nationality}**COMPLETIONS**\n\n${txtList}\n**COMPLETED LEGACY LEVELS**\n\n${txtExtra}\n**PROGRESSES**\n\n${txtProgs}`)
            .setFooter(`${ku} completions, ${uk} progresses`)
            await interaction.reply({embeds: [embed]})
        }
    }
}