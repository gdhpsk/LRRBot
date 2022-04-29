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
    .setName("player")
    .setDescription("What is the players name?")
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
.addIntegerOption((option) =>
    option
    .setName("average")
    .setDescription("What should the placement be?")
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
        let everything = await listSchema.find()
        everything.sort((a, b) => a._id - b._id)
        function findsmt(lev) {
            return everything.findIndex(e => e.name.toLowerCase() == lev.toLowerCase()) != -1 ? everything.findIndex(e => e.name.toLowerCase() == lev.toLowerCase()) : "???"
        }
        let object = {
            tag: interaction.options.getString("player"),
            above: {
                level: interaction.options.getString("above"),
                index: findsmt(interaction.options.getString("above"))
            },
            below: {
              level:  interaction.options.getString("below"),
              index: findsmt(interaction.options.getString("below"))
            },
            average: interaction.options.getInteger("average"),
            progresses: interaction.options.getString("progresses"),
            comments: interaction.options.getString("comments")
        }
        object.range = `${object.below.index}-${object.above.index}`
        let levopinion = await opinionsSchema.findById(interaction.options.getString("name"))
        if(!levopinion) {
             await opinionsSchema.create({_id: level.name, opinions: [object]})
        } else {
            levopinion.opinions.push(object)
            await levopinion.save()
        }
        await interaction.reply("Your opinion has been submitted!")
    }
}