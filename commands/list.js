const { SlashCommandBuilder } = require("@discordjs/builders")
const levelsSchema = require("../schema/levels")
const points = require("../point_calculator_stuff/levels_point_calculator")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Shows info of any level on the LRR Demonslist.")
    .addStringOption((option) => 
    option
    .setName("level")
    .setDescription("What level do you want me to display?")
    .setRequired(false)),
    async execute(interaction, Discord, client) {
        await interaction.deferReply()
        var everything = await levelsSchema.find()
        everything.sort((a, b) => a._id - b._id)
        const levels = everything.reduce(function(acc, cur, i) {
            acc[everything[i].name] = cur;
            return acc;
          }, {});
        var numarray = []
        const embed = new Discord.MessageEmbed()
let arrayofrecords = []
let arrayofprogs = []
        if(!interaction.options.getString("level")) {
            var array = []
            var page = 10
            var fr = ""
            for(let i = 0; i < Math.floor(Object.keys(levels).length/page); i++) {
                let addition = 0
                if(!Number.isInteger(Object.keys(levels).length/page)) {
                    addition = 1
                }
                var txt = ""
                var number = page * i
                for(let j = number; j < (number + page); j++) {
                    let smt = [`${j+1}. `]
                    if(j > 149) {
                        smt[0] = ""
                    }
                    txt += `[${smt[0]}${Object.values(levels)[j].name} by ${Object.values(levels)[j].publisher}](https://www.youtube.com/watch?v=${Object.values(levels)[j].ytcode})\n\n`
                }
                array.push(new Discord.MessageEmbed().setDescription(txt).setTitle("Low Refresh Rate List Levels").setFooter(`Page ${i+1}/${Math.floor(Object.keys(levels).length/page)+addition}`))
            }
            if(array.length*page != Object.keys(levels).length) {
                for(let j = (array.length * page); j < Object.keys(levels).length; j++) {
                    fr += `[${Object.values(levels)[j].name} by ${Object.values(levels)[j].publisher}](https://www.youtube.com/watch?v=${Object.values(levels)[j].ytcode})\n\n`
                }
                array.push(new Discord.MessageEmbed().setDescription(fr).setTitle("Low Refresh Rate List Levels").setFooter(`Page ${Math.floor(Object.keys(levels).length/page)+addition}/${Math.floor(Object.keys(levels).length/page)+addition}`))
            }
            var bu = new Discord.MessageActionRow()
            let emoji = ["Back", "Next", "Skip Forward", "Skip Back"]
            for(let i = 0; i < 4; i++) {
                bu.addComponents(
                    new Discord.MessageButton()
                    .setCustomId(i.toString())
                    .setStyle("PRIMARY")
                    .setLabel(emoji[i])
                )
            }
            let whyudo = 0
            let smt = await interaction.editReply({embeds: [array[0]], components: [bu], fetchReply: true})
            client.on("interactionCreate", async(buttonclick) => {
                if(!buttonclick.isButton()) return;
                if(smt.id != buttonclick.message.id) return
                switch (buttonclick.customId) {
                    case "0":
                        whyudo = whyudo > 0 ? --whyudo : array.length - 1;
                        await buttonclick.update({embeds: [array[whyudo]], components: [bu]})
                        break;
                    case "1":
                        whyudo = whyudo + 1 < array.length ? ++whyudo : 0;
                        await buttonclick.update({embeds: [array[whyudo]], components: [bu]})
                        break; 
                    case "2":
                        whyudo = array.length-1
                        await buttonclick.update({embeds: [array[whyudo]], components: [bu]})
                        break;
                     case "3":
                        whyudo = 0
                        await buttonclick.update({embeds: [array[whyudo]], components: [bu]})
                        break;
                }
            })
        } else {
            let ghj = false
            var act = interaction.options.getString("level")
            if(!isNaN(interaction.options.getString("level")) && !levels[interaction.options.getString("level")]) {
                if(!Object.keys(levels)[act-1]) {
                    await interaction.editReply({content: "Please enter a valid placement number!", ephemeral: true})
                    return
                }
                if(Object.keys(levels).indexOf(Object.keys(levels)[act-1]) > Object.keys(levels).indexOf("Final Epilogue")) {
                    await interaction.editReply({content: "Please enter a valid placement number!", ephemeral: true})
                    return
                }
                act = Object.keys(levels)[act-1]
                ghj = true
            }
        if(!levels[interaction.options.getString("level")] && interaction.options.getString("level") != "generate" && !ghj) {
            await interaction.editReply({content: "Please enter a valid level!", ephemeral: true})
        } else {
            let dates = await fetch("https://gdlrrlist.cf/api/nationsemotes", {
                method: "get",
                headers: { "Content-Type": "application/json" }
            })
            let nationthing = await dates.json()
            let leveldates = await fetch("https://gdlrrlist.cf/api/nationalities", {
                method: "get",
                headers: { "Content-Type": "application/json" }
            })
            let levelnationthing = await leveldates.json()
            var gay = ""
            if(act == "generate") {
                var um = Math.floor(Math.random() * Object.keys(levels).indexOf("Final Epilogue"))
                gay = Object.keys(levels)[um]
                embed.setAuthor(`${interaction.user.tag} generated a level!`)
            } else {
                gay = act
            }
            if(levels[gay].minimumPercent) {
                embed.setFooter(`The minimum percentage requirement for this level is ${levels[gay].minimumPercent}%.\nNumber of points given (completion): ${points(gay, levels)}`)
            }
            var txt = "**COMPLETIONS**\n\n"
            for(let i = 0; i < levels[gay].list.length; i++) {
                var list = levels[gay].list[i]
                var ar = [`${list.hertz}hz`, ""]
                if(list.name == "Removed") {
                    txt = `Removed ${list.link}`
                } else {
                    if(list.hertz == "M") {
                        ar[0] = "Mobile"
                       }
                       if(list.hertz == "MM") {
                        ar[0] = "Mobile Mouse"
                       }
                       if(list.hertz.startsWith("V/")) {
                        ar[0] = `${list.hertz.split("V/")[1] == "M" ? "Mobile" : `${list.hertz.split("V/")[1]}hz`} as a verification`
                       }
                       if(levelnationthing[list.name]) {
                           if(nationthing[levelnationthing[list.name].replace(/_/g, " ").toLowerCase()]) {
                               ar[1] = ` ${nationthing[levelnationthing[list.name].replace(/_/g, " ").toLowerCase()]}`
                           }
                       }
                       txt += `-${ar[1]} ${list.name} beat [${gay} on ${ar[0]}.](${list.link})\n\n`
                       arrayofrecords.push(`-${ar[1]} ${list.name} beat [${gay} on ${ar[0]}.](${list.link})\n\n`)
                       numarray.push(ar[0])
                }
            }
            let txt2 = ""
            if(levels[gay].progresses && Object.keys(levels).indexOf(gay) < 75) {
                if(levels[gay].progresses[0] != "none") {
                   txt2 += "**PROGRESSES**\n\n"
                    levels[gay].progresses.sort((a, b) => b.percent - a.percent)
            for(let i = 0; i < levels[gay].progresses.length; i++) {
                var progresses = levels[gay].progresses[i]
                var ar = [`${progresses.hertz}hz`, ""]
                 if(progresses.hertz == "M") {
                     ar[0] = "Mobile"
                    }
                       if(progresses.hertz == "MM") {
                        ar[0] = "Mobile Mouse"
                       }
                       if(progresses.hertz?.startsWith("V/")) {
                        ar[0] = `${progresses.hertz.split("V/")[1] == "M" ? "Mobile" : `${progresses.hertz.split("V/")[1]}hz`} as a verification`
                       }
                       if(levelnationthing[progresses.name]) {
                        if(nationthing[levelnationthing[progresses.name].replace(/_/g, " ").toLowerCase()]) {
                            ar[1] = ` ${nationthing[levelnationthing[progresses.name].replace(/_/g, " ").toLowerCase()]}`
                        }
                    }
                    txt2 += `-${ar[1]} ${progresses.name} got ${progresses.percent}% on [${gay} on ${ar[0]}.](${progresses.link})\n\n`
                    arrayofprogs.push(`-${ar[1]} ${progresses.name} got ${progresses.percent}% on [${gay} on ${ar[0]}.](${progresses.link})\n\n`)
                    numarray.push(ar[0])
                }
            }
        }
        var gg = "legacy"
        if(Object.keys(levels).indexOf(gay) < 75) {
            gg = "index"
        } else if(Object.keys(levels).indexOf(gay) > 74 && Object.keys(levels).indexOf(gay) < 150) {
            gg = "extended"
        }
        let sendreal = true
        console.log(arrayofrecords.length)
        if(txt.length+txt2.length > 3000) {
            sendreal = false
            let page = 10
            let embeds = []
            let addition = 0
            if(!Number.isInteger(arrayofrecords.length/page)) {
                addition = 1
            }
            for(let i = 0; i < Math.floor(arrayofrecords.length/page)+addition; i++) {
                let txtthing = ""
                if(i == 0) {
                    txtthing += "**COMPLETIONS**\n\n"
                }
                if(i == Math.floor(arrayofrecords.length/page)) {
                    for(let j = i*page; j < arrayofrecords.length; j++) {
                        txtthing += arrayofrecords[j]
                    }
                } else {
                    for(let j = i*page; j < (i+1)*page; j++) {
                        txtthing += arrayofrecords[j]
                    }
                }
                embeds.push(new Discord.MessageEmbed().setTitle(`#${Object.keys(levels).indexOf(gay)+1} - ${gay} by ${levels[gay].publisher}`)
            .setURL(`https://www.youtube.com/watch?v=${levels[gay].ytcode}`)
            .setImage(`https://i.ytimg.com/vi/${levels[gay].ytcode}/mqdefault.jpg`)
            .setDescription(txtthing))
            }
            if(txt2.length != 0) {
                let addition = 0
                if(!Number.isInteger(arrayofprogs.length/page)) {
                    addition = 1
                }
                for(let i = 0; i < Math.floor(arrayofprogs.length/page)+addition; i++) {
                    let txtthing = ""
                    if(i == 0) {
                        txtthing += "**PROGRESSES**\n\n"
                    }
                    if(i == Math.floor(arrayofprogs.length/page)) {
                        for(let j = i*page; j < arrayofprogs.length; j++) {
                            txtthing += arrayofprogs[j]
                        }
                    } else {
                        for(let j = i*page; j < (i+1)*page; j++) {
                            txtthing += arrayofprogs[j]
                        }
                    }
                    embeds.push(new Discord.MessageEmbed().setTitle(`#${Object.keys(levels).indexOf(gay)+1} - ${gay} by ${levels[gay].publisher}`)
            .setURL(`https://www.youtube.com/watch?v=${levels[gay].ytcode}`)
            .setImage(`https://i.ytimg.com/vi/${levels[gay].ytcode}/mqdefault.jpg`)
            .setDescription(txtthing))
                }
            }
            var bu = new Discord.MessageActionRow()
            let emoji = ["Back", "Next", "Skip Forward", "Skip Back"]
            for(let i = 0; i < 4; i++) {
                bu.addComponents(
                    new Discord.MessageButton()
                    .setCustomId(i.toString())
                    .setStyle("PRIMARY")
                    .setLabel(emoji[i])
                )
            }
            let whyudo = 0
            let smt = await interaction.editReply({embeds: [embeds[0]], components: [bu]})
            client.on("interactionCreate", async(buttonclick) => {
                if(!buttonclick.isButton()) return;
                if(smt.id != buttonclick.message.id) return
                switch (buttonclick.customId) {
                    case "0":
                        whyudo = whyudo > 0 ? --whyudo : embeds.length - 1;
                        await buttonclick.update({embeds: [embeds[whyudo]], components: [bu]})
                        break;
                    case "1":
                        whyudo = whyudo + 1 < embeds.length ? ++whyudo : 0;
                        await buttonclick.update({embeds: [embeds[whyudo]], components: [bu]})
                        break; 
                    case "2":
                        whyudo = embeds.length-1
                        await buttonclick.update({embeds: [embeds[whyudo]], components: [bu]})
                        break;
                     case "3":
                        whyudo = 0
                        await buttonclick.update({embeds: [embeds[whyudo]], components: [bu]})
                        break;
                }
            })
            //txt = `Number of 61hz> records: ${numarray.filter(v => parseInt(v) < 61).length}\n\nNumber of 61-75hz records: ${numarray.filter(v => parseInt(v) > 60).length}\n\nNumber of Mobile records: ${numarray.filter(v => v == "Mobile").length}\n\nNumber of Points Given: ${points(gay, levels)}\n\nLink to the website: https://gdlrrlist.cf/${gg}.html`
         } else {
             txt += txt2
         }
         if(sendreal) {
            embed.setTitle(`#${Object.keys(levels).indexOf(gay)+1} - ${gay} by ${levels[gay].publisher}`)
            embed.setURL(`https://www.youtube.com/watch?v=${levels[gay].ytcode}`)
            embed.setImage(`https://i.ytimg.com/vi/${levels[gay].ytcode}/mqdefault.jpg`)
            embed.setDescription(txt)
            await interaction.editReply({embeds: [embed]})
         }
    }
        }
    }
    }