const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("testing")
    .setDescription("testing"),
    async execute(interaction, Discord, client) {
        const response = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/extended.json');
        const data = await response.json();
        console.log(JSON.parse(data[0].list))
        
       await interaction.reply("KK")
    }
}