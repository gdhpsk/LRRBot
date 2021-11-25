const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("testing")
    .setDescription("testing"),
    async execute(interaction, Discord, client) {
        const body = {a: 1};

const response = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/extended.json', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
const data = await response.json();

console.log(JSON.parse(data["Caution"].list))
        
       await interaction.reply("KK")
    }
}