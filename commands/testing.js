const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("testing")
    .setDescription("testing"),
    async execute(interaction, Discord, client) {
        var api = await require("../fetch_api")("leaderboard")
        console.log(Object.keys(api).toString())
       await interaction.reply(`it worked`)
    }
}