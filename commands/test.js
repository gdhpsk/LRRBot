const { SlashCommandBuilder } = require("@discordjs/builders")
const api = require("../levels_fetch_api")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("testing api fetch"),
    async execute(interaction, Discord, client) {
        interaction.reply(`api["Aronia"].toString()`)
    }
}