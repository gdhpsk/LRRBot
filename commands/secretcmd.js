const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("secret")
    .setDescription("Shhhh"),
    private: true,
    async execute(interaction, Discord, client) {
       await  interaction.reply("yo")
    }
}