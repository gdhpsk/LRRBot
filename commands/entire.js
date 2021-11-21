const { SlashCommandBuilder } = require("@discordjs/builders")
const levels = require("../JSON/levels.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("entire")
    .setDescription("The entire list"),
    async execute(interaction, Discord, client) {
        var txt = ""
        for(const key in levels) {
            if(Object.keys(levels).indexOf(key) <= 149) {
                txt += `${key}, `
                continue;
            } else {
                break;
            }
        }
        console.log(txt)
    }
}