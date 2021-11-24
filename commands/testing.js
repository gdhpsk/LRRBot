const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName("testing")
    .setDescription("testing"),
    async execute(interaction, Discord, client) {
        const obj = require("../fetch_api");
        console.log(obj)
    }
}