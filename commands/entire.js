const { SlashCommandBuilder } = require("@discordjs/builders")
const levels = require("../JSON/levels.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("entire")
    .setDescription("The entire list"),
    async execute(interaction, Discord, client) {
        var txt = ""
        for(const key in levels) {
            if(Object.keys(levels).indexOf(key) <= Object.keys(levels).indexOf("Final Epilogue")) {
            txt += `${key}, `
            }
        }
        console.log(txt)
    }
}