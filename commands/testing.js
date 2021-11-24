const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("testing")
    .setDescription("testing"),
    async execute(interaction, Discord, client) {
        const obj = require("../fetch_api");
       await interaction.reply(obj)
    }
}