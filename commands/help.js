const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const commands = require("../JSON/commands.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("This is the help command")
    .addStringOption((option) =>
        option
        .setName("command")
        .setDescription("Which command do you want info on?")
        .setRequired(false)
    ),
    async execute(interaction, Discord, client) {
        var embed = new EmbedBuilder()
        var commandName = interaction.options.getString("command")
        if(!commandName) {
            var txt = ""
            for(let i = 0; i < commands.commandList.length; i++) {
                txt += `${i+1}. \`${commands.commandList[i].name}\` - ${commands.commandList[i].description}\n\n`
            }
            embed.setTitle("List of commands")
            embed.setFooter({text: "All commands are slash commands"})
            embed.setDescription(txt)
            interaction.reply({embeds: [embed]})
        } else {
            var ar = []
            for(let i = 0; i < commands.commandList.length; i++) {
                ar.push(commands.commandList[i].name)
            }
            if(!ar.includes(commandName)) {
                interaction.reply({content: `${commandName} is not a valid command name!`, ephemeral: true})
            } else {
                if(commandName == "help") {
                    var txt = ""
                    for(let i = 0; i < commands.commandList.length; i++) {
                        txt += `${i+1}. \`${commands.commandList[i].name}\` - ${commands.commandList[i].description}\n\n`
                    }
                    embed.setTitle("List of commands")
                    embed.setFooter({text: "All commands are slash commands"})
                    embed.setDescription(txt)
                    interaction.reply({embeds: [embed]})
                } else {
                    var text = "**OPTIONAL ARGUMENTS**: \n\n"
                    var gay = commands.commandUsage[commandName]
                    if(gay["Optional Arguments"] == "none") {
                        text += "none\n\n"
                    } else {
                        for(let i = 0; i < gay["Optional Arguments"].length; i++) {
                            text += `\`${gay["Optional Arguments"][i].name}\` - ${gay["Optional Arguments"][i].description}\n\n`
                        }
                    }
                    text += `**REQUIRED ARGUMENTS**: \n\n`
                    if(gay["Required Arguments"] == "none") {
                        text += "none"
                    } else {
                        for(let i = 0; i < gay["Required Arguments"].length; i++) {
                            text += `\`${gay["Required Arguments"][i].name}\` - ${gay["Required Arguments"][i].description}\n\n`
                        }
                    }
                    embed.setTitle(`${commandName} command help`)
                    embed.setDescription(text)
                    interaction.reply({embeds: [embed]})
                }
            }
        }
    }
}