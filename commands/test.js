const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Rolls a number between 1-100 by default")
    .addIntegerOption((option) =>
        option
        .setName("number")
        .setDescription("between 1 and what number do you wanna roll")
        .setRequired(false)
    ),
    async execute(interaction, Discord, client) {
        var generate = 100
        if(interaction.options.getInteger("number")) {
            generate = interaction.options.getInteger("number")
        }
        interaction.reply((Math.floor(Math.random() * generate) + 1).toString())
    }
} 