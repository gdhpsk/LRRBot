const { SlashCommandBuilder } = require("@discordjs/builders")
const levels = require("../JSON/levels.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("minimum")
    .setDescription("Just seeing"),
    async execute(interaction, Discord, client) {
        var txt = ""
       for(let i = 0; i < 75; i++) {
            txt += `${Object.values(levels)[i].minimumPercent}, `
       }
       interaction.reply(txt)
    }
}