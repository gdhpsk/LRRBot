const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("secret")
    .setDescription("Shhhhh"),
    private: true,
    async execute(interaction, Discord, client) {
        interaction.reply("yo")
    }
}