const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("secret")
    .setDescription("Shhhhh")
    .addSubcommand(subcommand =>
        subcommand
        .setName("addpack")
        .setDescription("Adds a level pack")
    ),
    async execute(interaction, Discord, client) {
        if(interaction.options.getSubcommand() == "addpack") {
           let modal = new ModalBuilder()
           .setTitle("Add Level Pack")
           .setCustomId("addpackform")
           .addComponents([
               new ActionRowBuilder({ components: [
                   new TextInputBuilder()
                   .setCustomId("id")
                   .setLabel("Role ID")
                   .setStyle(1)
               ]})
           ])
           await interaction.showModal(modal)
        client.on('interactionCreate', interaction => {
            if (!interaction.isModalSubmit()) return;
            const text = interaction.fields.getTextInputValue('id');
            interaction.reply({content: `You inputted the role ID ${text}`, ephemeral: true})
        });
        }
    }
}