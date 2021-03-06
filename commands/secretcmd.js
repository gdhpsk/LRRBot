const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder } = require("discord.js")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("secret")
    .setDescription("Shhhhh")
    .addSubcommand(subcommand =>
        subcommand
        .setName("addpack")
        .setDescription("Adds a level pack")
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName("deletepack")
        .setDescription("Deletes a level pack")
    ),
    async execute(interaction, Discord, client) {
        if(interaction.options.getSubcommand() == "deletepack") {
            let modal = new ModalBuilder()
            .setTitle("Delete Level Pack")
            .setCustomId("deletepackform")
            .addComponents([
                new ActionRowBuilder({ components: [
                    new TextInputBuilder()
                    .setCustomId("id")
                    .setLabel("Role ID")
                    .setPlaceholder("Put the discord role ID here")
                    .setStyle(1)
                    .setRequired(true)
                ]}),
            ])
            await interaction.showModal(modal)
         client.once('interactionCreate', async interaction => {
             if (!interaction.isModalSubmit()) return;
             const id = interaction.fields.getTextInputValue('id');
             await fetch("https://gdlrrlist-new.gdhpsk.repl.co/roles/packs/delete", {
                 method: "post",
                 headers: {
                     cookie: `token=${process.env.web_token}`,
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify({
                     id
                 }),
                })
            interaction.reply({content: `Role ID ${id}`, ephemeral: true})
         });
     }
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
        client.once('interactionCreate', async interaction => {
            if (!interaction.isModalSubmit()) return;
            const id = interaction.fields.getTextInputValue('id');
            const levels = interaction.fields.getTextInputValue('levels').split(", ");
            const category = interaction.fields.getTextInputValue('category');
            await fetch("https://gdlrrlist-new.gdhpsk.repl.co/roles/packs/add", {
                method: "post",
                headers: {
                    cookie: `token=${process.env.web_token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id, 
                    levels: JSON.stringify(levels), 
                    category
                }),

            })
            interaction.reply({content: `Here is what you inputted: ${id}, ${JSON.stringify(levels)}, ${category}`, ephemeral: true})
        });
        }
    }
}