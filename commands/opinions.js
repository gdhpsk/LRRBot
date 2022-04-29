const { SlashCommandBuilder } = require("@discordjs/builders")
const listSchema = require("../schema/levels")
const opinionsSchema = require("../schema/opinions")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("opinion")
    .setDescription("Request an opinion for an LRR level")
    .addStringOption((option) =>
        option
        .setName("name")
        .setDescription("What is the level name? (must be on lrrlist)")
        .setRequired(true)
    )
    .addStringOption((option) =>
    option
    .setName("above")
    .setDescription("Above what level?")
    .setRequired(true)
)
.addStringOption((option) =>
    option
    .setName("below")
    .setDescription("Below what level?")
    .setRequired(true)
)
.addStringOption((option) =>
    option
    .setName("progresses")
    .setDescription("Any progresses on any of the levels?")
    .setRequired(true)
)
.addStringOption((option) =>
    option
    .setName("comments")
    .setDescription("Anything to add?")
    .setRequired(false)
),
    async execute(interaction, Discord, client) {
        let level = await listSchema.findOne({name: interaction.options.getString("name")})
        if(!level) {
            await interaction.reply("Please input a valid level!")
            return
        }
        let object = {
            _id: interaction.user.tag,
            above: interaction.options.getString("above"),
            below: interaction.options.getString("below"),
            progresses: interaction.options.getString("progresses"),
            comments: interaction.options.getString("comments")
        }
        let levopinion = await opinionsSchema.findOne({name: level.name})
        if(!levopinion) {
             await opinionsSchema.create({_id: level.name, opinions: [object]})
        } else {
            levopinion.opinions.push(object)
            await levopinion.save()
        }
        await interaction.reply("Your opinion has been submitted!")
    }
}