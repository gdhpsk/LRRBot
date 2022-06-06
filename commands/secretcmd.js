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
                   .setPlaceholder("Put the discord role ID here")
                   .setStyle(1)
                   .setRequired(true)
               ]}),
               new ActionRowBuilder({ components: [
                new TextInputBuilder()
                .setCustomId("levels")
                .setLabel("Pack Levels")
                .setPlaceholder("Seperate via \", \"")
                .setStyle(1)
                .setRequired(true)
            ]}),
            new ActionRowBuilder({ components: [
                new TextInputBuilder()
                .setCustomId("category")
                .setLabel("Category")
                .setPlaceholder("Legacy, Advanced, etc.")
                .setStyle(1)
                .setRequired(true)
            ]}),
           ])
           await interaction.showModal(modal)
        client.on('interactionCreate', interaction => {
            if (!interaction.isModalSubmit()) return;
            const id = interaction.fields.getTextInputValue('id');
            const levels = interaction.fields.getTextInputValue('levels').split(", ");
            const category = interaction.fields.getTextInputValue('category');
            interaction.reply(`Here is what you inputted: ${id}, ${JSON.stringify(levels)}, ${category}`)
        });
        }
    }
}