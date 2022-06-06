const { ChannelType } = require("discord.js")
const Discord = require("discord.js")
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
		var allowedChannels = [
            "671454973346840616",
			"866382044699426886",
			"795414646600368181",
			"844088388092428298"
        ]
        if(!interaction.isCommand() || interaction.user.bot) return
		if(interaction.channel.type != ChannelType.DM && interaction.channel.type != ChannelType.GuildVoice) {
			if(!allowedChannels.includes(interaction.channel.id)) return
		}
	const command = interaction.client.commands.get(interaction.commandName)
	if(!command) return;
	try {
		await command.execute(interaction, Discord, interaction.client)
	} catch (err) {
		if(err) {
			console.log(err)
			if(!["secret"].includes(command.name)) {
			try {
				await interaction.reply({content: "An error occured while trying to execute this command.", ephemeral: true})
			} catch(_) {
				await interaction.editReply({content: "An error occured while trying to execute this command.", ephemeral: true})
			}
		}
	}
	}
    }
}