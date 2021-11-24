const { SlashCommandBuilder } = require("@discordjs/builders")
const lolxd = require("../levels_getting")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("testing something out"),
    async execute(interaction, Discord, client) {
        var generate = 100
        interaction.reply((Math.floor(Math.random() * generate) + 1).toString())
    }
} 