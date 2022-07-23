const { ButtonStyle } = require("discord.js")
var roulette = require("../schema/roulette")
module.exports = {
    name: "messageCreate",
   async execute(message) {
        const Discord = require("discord.js")
        const levelsSchema = require("../schema/levels") 
        const leaderboardSchema = require("../schema/leaderboard") 
        const prefix = ".."
        let args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        var allowedChannels = [
            "671454973346840616",
            "919475035750670360",
            "844088388092428298",
            "866382044699426886",
            "795414646600368181"
        ]
        if(message.author.bot) return;
        if(message.channel.type != "DM") {
            if(!allowedChannels.includes(message.channel.id)) return;
        }
        /*if(message.content == "..msg") { 
            message.client.guilds.fetch("904222136661577758").then(guild => {
                guild.channels.fetch("904222137278169099").then(msg => {
                    msg.messages.fetch({ limit: 1 }).then(messages => {
                        let last = messages.first()
                        console.log(last.content)
                    })
                })
            }) 
        }*/
        if(message.content.toLowerCase().includes("carcano") && message.channel.id != "844088388092428298") {
            message.reply(`Oh you said the word “Carcano”? Allow me to explain how this incompetent glow-fest of a level is one of the worst and pathetic excuses for an extreme ever. Let’s start off with the deco. The deco is literally just 1.0 but the amount of glow used is wayyyy more than the amount of glow the actors in Twlight had. Did you not see how much they glowed???? Well Carcano glows way more and is the equivalent of stepping on a lego for your eyes. Now let’s talk about the song. You start off with the “tah-taahh-taAAHHHH” which is the dumbest sounding thing I have ever heard in my life and literally sounds squeakier and more annoying than I could ever sound. That’s just the predrop alone. Once you get to the drop, it doesn’t get any better. It has random notes that just feel like dragging on more than the Civil War and it’s so stupid and whoever listened to this and thought “yeah man this is fire” must’ve been braindead enough to hear something else that isn’t this garbage excuse of a song that Creo somehow made. How does the guy behind stuff like, Sphere, Dimension, and Never Make It make THIS pathetic, incompetent, useless piece of “music” that is just dragged out squeaky notes. Let’s talk about perhaps the worst part of the level, the gameplay. The gameplay is trying to make itself like Cognition but turns out the same way costume stores try to replicate movie characters’ costumes. It doesn’t work AT ALL. On top of all of this, every part has a several timings that just ruin the entire part and make it impossible to get consistent at literally any part of this garbage level. The gameplay makes me want to stick my head in the fridge since at least the cool air has better movements and sounds than the level will ever have and looks better. So my conclusion is that Carcano has eye-gouging deco, an ear-piercing song, and gameplay that wants to make an atheist walk to church to pray they don’t have to play this garbage, incompetent excuse of a “level”.`)
        }
        if(message.content.toLowerCase() == "femboy") {
            message.reply("OwO UwU")
        } 
        if(message.content.toLowerCase() == "fake skill") {
            message.reply("🤮")
        }
         if(message.content.toLowerCase().includes("360")) {
            message.reply("All y'all high refresh players who think Sonic Wave is easier then Erebus, first of all shut the fuck up and 2nd of all of the wave plays by itself for you guys.")
        } 
        if(message.content.toLowerCase().includes("fluked")) { 
            message.reply("https://cdn.discordapp.com/attachments/908882016345395241/911898128448364544/You.gif")
        }
        if(message.content == "..check") {
            let lev = await levelsSchema.find()
            lev.sort((a, b) => a._id - b._id)
        let lead = await leaderboardSchema.find()
        const leaderboard = lead.reduce(function(acc, cur, i) {
            acc[lead[i].name] = cur;
            return acc;
          }, {});
        let levels = lev.reduce(function(acc, cur, i) {
            acc[lev[i].name] = cur;
            return acc;
          }, {});
            var array = []
            var array2 = []
            var array3 = []
            for(let i = 0; i < 75; i++) {
                if(Object.values(levels)[i].progresses) {
                    if(Object.values(levels)[i].progresses[0] != "none") {
                    for(let j = 0; j < Object.values(levels)[i].progresses.length; j++) {
                        array.push(`${Object.values(levels)[i].progresses[j].name}, ${Object.values(levels)[i].name}, ${Object.values(levels)[i].progresses[j].percent}`)
                    }
                }
            }
            }
            for(let i = 0; i < Object.keys(leaderboard).length; i++) {
                for(let j = 0; j < Object.values(leaderboard)[i].progs.length; j++) {
                    array2.push(`${Object.keys(leaderboard)[i]}, ${Object.values(leaderboard)[i].progs[j].name}, ${Object.values(leaderboard)[i].progs[j].percent}`)
                }
            }
            for(let i = 0; i < array.length; i++) {
                if(!array2.includes(array[i])) {
                    array3.push(`${array[i]}`)
                }
            }
            array3.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
            var f = ""
            for(let i = 0; i < array3.length; i++) {
                f += `${array3[i]}\n`
            }
            //const fs = require("fs")
            /*fs.appendFile("../fix.txt", f, function (err) {
                if(err) console.log(err)
            })*/
            console.log(f)
            message.channel.send("Worked Successfully")
        }
        if(cmd == "roulette") {
            let real = await roulette.findOne({user: message.author.id})
            if(real?.redirect) {
                real = await roulette.findOne({user: real.redirect})
            }
            var object = real?.levels
        var config = real?.config
        if(!real?.levels && args[0] != "start" && args[0] != "invite" && args[0] != "remove") return message.reply("Please start a roulette!")
            let lev = await levelsSchema.find()
            lev.sort((a, b) => a._id - b._id)
            let levels = lev.reduce(function(acc, cur, i) {
                acc[lev[i].name] = cur;
                return acc;
              }, {});
            var number = parseInt(args[0])+1
            var random
            if(config) { 
                random = Math.floor(Math.random() * config.levels.length-1)
            }
            if(!args[0]) return message.reply("Please input a valid argument! Valid args are: 'start', 'end', 'score', 'invite', 'skip', 'remove', and a percentage number.");
            if(isNaN(parseInt(args[0])) && args[0] != "start" && args[0] != "end" && args[0] != "score" && args[0] != "invite" && args[0] != "skip" && args[0] != "remove") return message.reply("Please input a valid number");
        if(args[0] == "invite") {
            if(!args[1]) {
                return message.reply("What user do you want to invite to your roulette? Type the User ID/ping the user")
            }
            let exists = await roulette.findOne({user: message.author.id})
            if(!exists || exists?.redirect) {
                return message.reply("Please start your own session before inviting anyone!")
            }
            if(!message.mentions.users.first()) {
                if(message.guild.members.cache.get(args[1])) {
                         real = await roulette.create({user: message.author.id, redirect: args[1]})
                         let tag = `${message.guild.members.cache.get(args[1]).user.username}#${message.guild.members.cache.get(args[1]).user.discriminator}`
                         message.reply(`${tag} has been added to your roulette.`)
                } else {
                    return message.reply("Please enter a valid user ID")
                }
            } else {
                if(message.client.users.cache.find(user => user.id == message.mentions.users.first().id)) {
                    real = await roulette.create({user: message.author.id, redirect: message.mentions.users.first().id})
                    message.reply(`${message.client.users.cache.find(user => user.id == message.mentions.users.first().id).tag} has been added to your roulette.`)
                } else {
                    return message.reply("Please enter a valid user")
                }
            }
        } else {

            if(args[0] == "remove") {
                if(!args[1]) {
                    return message.reply("What user do you want to remove from your roulette? Type the User ID/ping the user")
                }
                let exists = await roulette.findOne({user: message.author.id})
                if(!exists || exists?.redirect) {
                    return message.reply("Please start your own session before removing anyone!")
                }
                if(!message.mentions.users.first()) {
                    if(message.guild.members.cache.get(args[1])) {
                        try {
                                await roulette.findOneAndDelete({user: message.author.id, redirect: args[1]})
                                let tag = `${message.guild.members.cache.get(args[1]).user.username}#${message.guild.members.cache.get(args[1]).user.discriminator}`
                             return message.reply(`${tag} has been removed from your roulette.`)
                        } catch(_) {
                            return message.reply(`${tag} does not exist!`)
                        }
                    } else {
                        return message.reply("Please enter a valid user ID")
                    }
                } else {
                    if(message.client.users.cache.find(user => user.id == message.mentions.users.first().id)) {
                        try {
                            await roulette.findOneAndDelete({user: message.author.id, redirect: message.mentions.users.first().id})
                            let tag = `${message.client.users.cache.find(user => user.id == message.mentions.users.first().id).username}#${message.client.users.cache.find(user => user.id == message.mentions.users.first().id).discriminator}`
                         return message.reply(`${tag} has been removed from your roulette.`)
                    } catch(_) {
                        return message.reply(`${message.client.users.cache.find(user => user.id == message.mentions.users.first().id).tag} does not exist!`)
                    }
                    } else {
                        return message.reply("Please enter a valid user")
                    }
                }
                return
            } 

        if(args[0] == "score") {
           var j = ""
        for(let i = 0; i < real.levels.length; i++) {
            var tt = ["", `, you got ${real.levels[i+1]?.percent-1}%`, '']
            if(i == real.levels.length-1) {
                tt[0] = "(Currently working on) "
                tt[1] = ""
            }
            if(real.levels[i].skipped) {
                tt[1] = ""
                tt[2] = "(skipped) "
            }
            j += `#${i+1} - ${tt[2]}${tt[0]}${real.levels[i].name} ${real.levels[i].percent}% (#${Object.keys(lev.reduce(function(acc, cur, i) {
                acc[lev[i].name] = cur;
                return acc;
              }, {})).indexOf(real.levels[i].name)+1}${tt[1]})\n`
        }
        if(j.length > 4000) {
            j = `Levels: ${real.levels.length}\nWorking on: ${real.levels[real.levels.length-1]} ${real.levels[real.levels.length-1].percent.toString()}%`
        }
        var embedScore = new Discord.EmbedBuilder()
        .setTitle(`Score: ${real.levels.filter(e => !e.skipped).length-1}`)
            .setDescription(j || null)
           return message.reply({embeds: [embedScore]})
    }
    var objoflevels = []
            if(args[0] == "end" && !real?.levels) {
                 return message.reply("Please start a roulette before you want to end it!")
            } else if(args[0] == "end" && real?.levels) {
                let anotherOne = await roulette.findOne({user: message.author.id})
                if(anotherOne?.redirect) return message.reply("You must be the original roulette starter in order to end this roulette!")
                var j = ""
        for(let i = 0; i < real.levels.length-1; i++) {
            let tt = ['']
            if(real.levels[i].skipped) {
                tt[0] = "(skipped) "
            }
            j += `#${i+1} - ${tt[0]}${real.levels[i].name} ${real.levels[i].percent}% (#${Object.keys(lev.reduce(function(acc, cur, i) {
                acc[lev[i].name] = cur;
                return acc;
              }, {})).indexOf(real.levels[i].name)+1}${tt[0] != "(skipped) " ? `, you got ${real.levels[i+1].percent-1}%` : ""})\n`
        }
        if(j.length == 0) {
            j = "No levels were done in this roulette."
        }
        if(j.length > 4000) {
            j = `Levels: ${real.levels.length}`
        }
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Score: ${real.levels.filter(e => !e.skipped).length-1}`)
        .setDescription(j)
                number = real.levels[real.levels.length-1]?.percent ?? 1
                await roulette.findOneAndDelete({user: real.user})
                return message.reply({content: `You have ended the roulette at ${number}% on ${object[object.length-1].name}! Thanks for playing :)`, embeds: [embed]})
            } 
            var ikl = false
            if(args[0] == "start" && !real?.levels) {
                ikl = true
                let options = new Discord.ActionRowBuilder({components: [
                    new Discord.ButtonBuilder().setLabel("Main List").setCustomId("main").setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder().setLabel("Extended List").setCustomId("extended").setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder().setLabel("Legacy List").setCustomId("legacy").setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder().setEmoji("✅").setCustomId("done").setStyle(Discord.ButtonStyle.Primary)]
                })
                var smt = await message.reply({content: "What levels do you want your roulette to contain?", components: [options]})
                let arr = []
                var newmsg;
                message.client.on("interactionCreate", async(buttonclick) => {
                    if(!buttonclick.isButton()) return;
                    if(smt.id != buttonclick.message.id) return
                    if(message.author.id != buttonclick.message.mentions.users.first().id) return;
                    switch (buttonclick.customId) {
                        case "main": 
                            if(arr.includes("main")) {
                                arr = arr.filter(e => e != "main")
                            } else {
                                arr.push("main")
                            }
                            if(!newmsg) {
                                newmsg = await buttonclick.message.reply({content: `Levels included have been updated: ${arr}`, ephemeral: true})
                            } else {
                                    newmsg.edit(`Levels included have been updated: ${arr}`)
                            }
                            break;
                        case "extended":
                            if(arr.includes("extended")) {
                                arr = arr.filter(e => e != "extended")
                            } else {
                            arr.push("extended")
                            }
                            if(!newmsg) {
                                newmsg = await buttonclick.message.reply({content: `Levels included have been updated: ${arr}`, ephemeral: true})
                            } else {
                                    newmsg.edit(`Levels included have been updated: ${arr}`)
                            }
                            break;
                        case "legacy":
                            if(arr.includes("legacy")) {
                                arr = arr.filter(e => e != "legacy")
                            } else {
                            arr.push("legacy")
                            }
                            if(!newmsg) {
                                newmsg = await buttonclick.message.reply({content: `Levels included have been updated: ${arr}`, ephemeral: true})
                            } else {
                                    newmsg.edit(`Levels included have been updated: ${arr}`)
                            }
                            break;
                         case "done":
                            await buttonclick.message.delete()
                             if(arr.length == 0) {
                                 arr = ["main", "extended", "legacy"]
                             }
                             if(arr.includes("main")) {
                                 for(let i = 0; i < 75; i++) {
                                     objoflevels.push(Object.values(levels)[i].name)
                                 }
                             }
                             if(arr.includes("extended")) { 
                                for(let i = 75; i < 150; i++) {
                                    objoflevels.push(Object.values(levels)[i].name)
                                }
                            }
                            if(arr.includes("legacy")) { 
                                for(let i = 150; i < Object.keys(levels).indexOf("Final Epilogue")+1; i++) {
                                    objoflevels.push(Object.values(levels)[i].name)
                                }
                            }
                            random = Math.floor(Math.random() * objoflevels.length-1)
                            real = await roulette.create({user: message.author.id, config: {
                                levels: objoflevels
                            }})
                            config = {
                                levels: objoflevels
                            }
                            
                            number = 1
                            let levelinfo = await levelsSchema.findOne({name: config.levels[random]})
                                    const embed = new Discord.EmbedBuilder() 
                                    .setTitle(`#${levelinfo._id} - ${levelinfo.name} by ${levelinfo.publisher}`)
                                    .setDescription(`You have to get ${number}%`)
                                    .setImage(`https://i.ytimg.com/vi/${levelinfo.ytcode}/mqdefault.jpg`)
                                    .setURL(`https://www.youtube.com/watch?v=${levelinfo.ytcode}`)
                                    message.reply({embeds: [embed]})
                                    levelinfo.percent = number
                                    real.levels[real.levels.length] = levelinfo
                                    real.config.levels.splice(random, 1)
                                   
                                    await roulette.findOneAndUpdate({user: real.user}, real)
                                    break;
                    }
                })
            } else {
                if(args[0] == "start" && real?.levels) return message.reply("You already have an instance of a roulette! Use ..roulette end to end your current session.")
                if(args[0] != "skip") {
                    if(parseInt(args[0]) < 0) return message.reply("Please input a valid whole number!");
                    if(parseInt(args[0]) >= 101) return message.reply("Please input a percentage below 101%");
                }
                let int = args[0] != "skip" ? parseInt(args[0]) : real.levels[real.levels.length-1].percent+1
                if(real?.config) {
                    if(real?.config.levels.length == 0) {
                    await roulette.findOneAndDelete({user: real.user})
                    return message.reply("Congratulations, you've completed the lrr roulette! Now quit gd smh")
                    }
                }
                if(int > 99 && real?.levels) {
                    var j = ""
        for(let i = 0; i < real.levels.length; i++) {
            let tt = ['']
            if(real.levels.length-1 == i) {
                if(args[0] == "skip") {
                    tt[0] = "(skipped) "
                }
            }
            if(real.levels[i].skipped) {
                tt[0] = "(skipped) "
            }
            j += `#${i+1} - ${tt[0]}${real.levels[i].name} ${real.levels[i].percent}% (#${Object.keys(lev.reduce(function(acc, cur, i) {
                acc[lev[i].name] = cur;
                return acc;
              }, {})).indexOf(real.levels[i].name)+1}${tt[0] != "(skipped) " ? `, you got ${i == real.levels.length-1 ? 100 : real.levels[i+1].percent-1}%` : ""})\n`
        }
        if(j.length == 0) {
            j = "No levels were done in this roulette."
        }
        if(j.length > 4000) {
            j = `Levels: ${real.levels.length}`
        }
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Score: ${real.levels.filter(e => !e.skipped).length-1}`)
        .setDescription(j)
                   await roulette.findOneAndDelete({user: real.user})
                    return message.reply({content: "Congratulations, you've completed the lrr roulette! Now quit gd smh", embeds: [embed]})
                }
                if(int < real.levels[real.levels.length-1]?.percent ?? 1) return message.reply(`Please input a percentage above ${real.levels.length == 1 ? 0 : real.levels[real.levels.length-1]?.percent-1 ?? 1}%!`)
               
            }
            if(real?.levels && !ikl) {
                number = args[0] != "skip" ? parseInt(args[0])+1 : real.levels[real.levels.length-1].percent+1
                let levelinfo = await levelsSchema.findOne({name: real.config.levels[random]})
                const embed = new Discord.EmbedBuilder() 
                .setTitle(`#${levelinfo._id} - ${levelinfo.name} by ${levelinfo.publisher}`)
                .setDescription(`You have to get ${number}%`)
                .setImage(`https://i.ytimg.com/vi/${levelinfo.ytcode}/mqdefault.jpg`)
                .setURL(`https://www.youtube.com/watch?v=${levelinfo.ytcode}`)
                message.reply({embeds: [embed]})
                levelinfo.percent = number
                real.levels[real.levels.length-1].skipped = args[0] == "skip" ? true : false
                real.levels[real.levels.length] = levelinfo
                config.levels.splice(random, 1)
               
                await roulette.findOneAndUpdate({user: real.user}, real)
    } else if(!real?.levels && !ikl) {
        message.reply("Please start the roulette!")
    }
        } 
    }
    }
}