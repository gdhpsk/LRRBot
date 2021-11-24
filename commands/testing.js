const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("testing")
    .setDescription("testing"),
    async execute(interaction, Discord, client) {
        var obj = require("../levels_getting");
        interaction.reply(obj[0].list)
    }
}