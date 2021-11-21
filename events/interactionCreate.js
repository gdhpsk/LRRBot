const Discord = require("discord.js")
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if(!interaction.isCommand()) return
		if(interaction.channel.type != "DM") {
			if(!interaction.channel.permissionsFor(interaction.client.user.id).has("USE_APPLICATION_COMMANDS")) return
		}
	const command = interaction.client.commands.get(interaction.commandName)
	if(!command) return;
	try {
		await command.execute(interaction, Discord, interaction.client)
	} catch (err) {
		if(err) {
			console.log(err)
			await interaction.reply({content: "An error occured while trying to execute this command.", ephemeral: true})
		}
	}
    }
}