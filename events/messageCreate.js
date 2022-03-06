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
        if(message.content.toLowerCase().includes("carcano")) {
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
            if(message.author.id != "703364595321929730") return message.reply("Currently undergoing changes.")
            var real = await roulette.findById("61ff7b2fbd245cb98f6579fd")
            var object = real.levels 
        var obj = real.percent
        var config = real.config
           /* message.client.guilds.fetch("904222136661577758").then(guild => {
            guild.channels.fetch("904222137278169099").then(msg => {
                msg.messages.fetch({ limit: 1 }).then(messages => {
                    var last = messages.first().content
                    require("../JSON/commands.json").array = JSON.parse(last)
                })
            })
            })*/
            var karthik;
            var g;
            var deez;
            let lev = await levelsSchema.find()
            let levels = lev.reduce(function(acc, cur, i) {
                acc[lev[i].name] = cur;
                return acc;
              }, {});
            var number = parseInt(args[0])+1
            var random = Math.floor(Math.random() * Object.keys(levels).length-4)
            if(config[message.author.id]) { 
                random = config[message.author.id]
            }
            if(!args[0]) return message.reply("Please input the percentage you got. If you haven't started a roulette, start one by doing the command \"..roulette start\"");
            if(!object[message.author.id] && args[0] != "start" && args[0] != "join") return message.reply("Please start a roulette!")
            if(isNaN(parseInt(args[0])) && args[0] != "start" && args[0] != "end" && args[0] != "score" && args[0] != "join") return message.reply("Please input a valid number");
        /*if(args[0] != "end") {
            if(!object[message.author.id]) {
                object[message.author.id] = [
     
                ]
                karthik = object[message.author.id]
            } else {
                karthik = object[message.author.id]
            }
        }*/
        if(args[0] == "join") {
            if(!args[1]) {
                return message.reply("Who's roulette do you want to join? Type the User ID/ping the user")
            }
            if(!message.mentions.users.first()) {
                if(message.guild.members.cache.get(args[1])) {
                    const id = message.author.id
                    message.channel.send(`<@${message.guild.members.cache.find(user => user.id === args[1]).id}>, do you want <@${id}> to join your roulette?`)
                    const filter = m => m.author.id === message.guild.members.cache.find(user => user.id == args[1]).id;
                    const collector = message.channel.createMessageCollector({filter});
                    collector.on("collect", msg => {
                        if(!msg.author.bot) {
                        if(msg.content.toLowerCase() == "yes") {
                             msg.channel.send(`<@${id}>, This person has approved your request`)
                            collector.stop()
                        } else if(msg.content.toLowerCase() == "no") {
                            msg.channel.send(`<@${id}>, This person has declined your request`) 
                            collector.stop()
                        } else {
                            return msg.channel.send("Send a valid response! (either yes or no)")
                        }
                    }
                    })
                } else {
                    console.log(args[1])
                    return message.reply("Please enter a valid user ID")
                }
            } else {
                if(message.client.users.cache.find(user => user.id == message.mentions.users.first().id)) {
                    return message.reply("You have joined this roulette")
                } else {
                    return message.reply("Please enter a valid user")
                }
            }
        } else {
        if(args[0] == "score" && !object[message.author.id]) {
            return message.reply("Please start a roulette before you want to view your score!")
       } else if(args[0] == "score" && object[message.author.id]) {
           karthik = object[message.author.id]
           g = obj[message.author.id]
           levels = config[message.author.id]
           var j = ""
        for(let i = 0; i < karthik.length; i++) {
            var tt = ["", `, you got ${g[i+1]-1}%`]
            if(i == karthik.length-1) {
                tt[0] = "(Currently working on) "
                tt[1] = ""
            }
            j += `#${i+1} - ${tt[0]}${karthik[i]} ${g[i]}% (#${Object.keys(levels).indexOf(karthik[i])+1}${tt[1]})\n`
        }
        if(j.length > 4000) {
            j = `Levels: ${karthik.length}\nWorking on: ${karthik[karthik.length-1]} ${g[g.length-1].toString()}%`
        }
        var embedScore = new Discord.MessageEmbed()
            .setDescription(j)
            .setTitle(`Score: ${karthik.length-1}`)
           return message.reply({embeds: [embedScore]})
    }
    var objoflevels = {}
            if(args[0] == "end" && !object[message.author.id]) {
                 return message.reply("Please start a roulette before you want to end it!")
            } else if(args[0] == "end" && object[message.author.id]) {
                g = obj[message.author.id]
                karthik = object[message.author.id]
                levels = config[message.author.id]
                var j = ""
        for(let i = 0; i < karthik.length-1; i++) {
            j += `#${i+1} - ${karthik[i]} ${g[i]}% (#${Object.keys(levels).indexOf(karthik[i])+1}, you got ${g[i+1]-1}%)\n`
        }
        if(j.length == 0) {
            j = "No levels were done in this roulette."
        }
        if(j.length > 4000) {
            j = `Levels: ${karthik.length}`
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`Score: ${karthik.length-1}`)
        .setDescription(j)
                number = g[g.length-1]
                delete obj[message.author.id]
                delete object[message.author.id]
                delete config[message.author.id]
                await roulette.findById("61ff7b2fbd245cb98f6579fd").updateMany(null, real)
                // message.client.guilds.fetch("904222136661577758").then(guild => {
                //     guild.channels.fetch("904222137278169099").then(msg => {
                //         msg.send(JSON.stringify(real))
                //     })
                // })
                return message.reply({content: `You have ended the roulette at ${number}% on ${karthik[karthik.length-1]}! Thanks for playing :)`, embeds: [embed]})
            }
            var ikl = false
            if(args[0] == "start" && !object[message.author.id]) {
                ikl = true
                let options = new Discord.MessageActionRow({components: [
                    new Discord.MessageButton().setLabel("Main List").setCustomId("main").setStyle("PRIMARY"),
                    new Discord.MessageButton().setLabel("Extended List").setCustomId("extended").setStyle("PRIMARY"),
                    new Discord.MessageButton().setLabel("Legacy List").setCustomId("legacy").setStyle("PRIMARY"),
                    new Discord.MessageButton().setEmoji("✅").setCustomId("done").setStyle("PRIMARY")]
                })
                var smt = await message.reply({content: "What levels do you want your roulette to contain?", components: [options]})
                let arr = []
                message.client.on("interactionCreate", async(buttonclick) => {
                    if(!buttonclick.isButton()) return;
                    if(smt.id != buttonclick.message.id) return
                    switch (buttonclick.customId) {
                        case "main": 
                            arr.push("main")
                            break;
                        case "extended":
                            arr.push("extended")
                            break;
                        case "legacy":
                            arr.push("legacy")
                            break;
                         case "done":
                            await buttonclick.message.delete()
                             if(arr.length == 0) {
                                 arr = ["main", "extended", "legacy"]
                             }
                             console.log(arr)
                             if(arr.includes("main")) {
                                 for(let i = 0; i < 75; i++) {
                                    Object.values(levels)[i].list = undefined
                                    Object.values(levels)[i].progresses = undefined
                                  Object.values(levels)[i]._id = undefined
                                  Object.values(levels)[i].minimumPercent = undefined
                                     objoflevels[Object.values(levels)[i].name] = Object.values(levels)[i]
                                 }
                             }
                             if(arr.includes("extended")) { 
                                for(let i = 75; i < 150; i++) {
                                    Object.values(levels)[i].list = undefined
                                      Object.values(levels)[i].progresses = undefined
                                    Object.values(levels)[i]._id = undefined
                                    Object.values(levels)[i].minimumPercent = undefined
                                    objoflevels[Object.values(levels)[i].name] = Object.values(levels)[i]
                                }
                            }
                            if(arr.includes("legacy")) { 
                                for(let i = 150; i < Object.keys(levels).indexOf("Final Epilogue")+1; i++) {
                                    Object.values(levels)[i].list = undefined
                                      Object.values(levels)[i].progresses = undefined
                                    Object.values(levels)[i]._id = undefined
                                    Object.values(levels)[i].minimumPercent = undefined
                                    console.log('h')
                                    objoflevels[Object.values(levels)[i].name] = Object.values(levels)[i]
                                }
                            }

                            console.log(JSON.stringify(objoflevels)) 
                            random = Object.keys(objoflevels).length
                            config[message.author.id] = objoflevels
                            object[message.author.id] = [
                                
                            ] 
                            levels = config[message.author.id]
                            karthik = object[message.author.id]
                            obj[message.author.id] = [
                
                            ]
                            g = obj[message.author.id]
                            number = 1
                            for(let i = 0; i < Object.keys(levels).length; i++) {
                                if(!karthik.includes(Object.keys(levels)[random])) {
                                    const embed = new Discord.MessageEmbed() 
                                    .setTitle(`#${random+1} - ${Object.keys(objoflevels)[random]} by ${Object.values(objoflevels)[random].publisher}`)
                                    .setDescription(`You have to get ${number}%`)
                                    .setImage(`https://i.ytimg.com/vi/${Object.values(objoflevels)[random].ytcode}/mqdefault.jpg`)
                                    .setURL(`https://www.youtube.com/watch?v=${Object.values(objoflevels)[random].ytcode}`)
                                    message.reply({embeds: [embed]})
                                    g[g.length] = number
                                    karthik[karthik.length] = Object.keys(objoflevels)[random]
                                    delete config[message.author.id][Object.keys(levels)[random]] 
                                    await roulette.findById("61ff7b2fbd245cb98f6579fd").updateMany(null, real)
                                    // message.client.guilds.fetch("904222136661577758").then(guild => {
                                    //     guild.channels.fetch("904222137278169099").then(async msg => {
                                    //         msg.send(JSON.stringify(real))
                                    //     })
                                    // })
                                    break;
                                } else {
                                    random = Math.floor(Math.random() * Object.keys(levels).length-1)
                                    continue;
                                }
                            }
                            break;
                    }
                })
                // number = 1
            } else {
                g = obj[message.author.id]
                if(args[0] == "start" && object[message.author.id]) return message.reply("You already have an instance of a roulette! Use ..roulette end to end your current session.")
                if(parseInt(args[0]) < 0) return message.reply("Please input a valid whole number!");
                if(parseInt(args[0]) >= 101) return message.reply("Please input a percentage below 101%");
                if(parseInt(args[0]) == 100 && object[message.author.id]) {
                    delete object[message.author.id]
                    delete obj[message.author.id]
                    delete config[message.author.id]
                    await roulette.findById("61ff7b2fbd245cb98f6579fd").updateMany(null, real)
                    // message.client.guilds.fetch("904222136661577758").then(guild => {
                    //     guild.channels.fetch("904222137278169099").then(msg => {
                    //         msg.send(JSON.stringify(real))
                    //     })
                    // })
                    return message.reply("Congratulations, you've completed the lrr roulette! Now quit gd smh")
                }
                if(parseInt(args[0]) < g[g.length-1]) return message.reply(`Please input a percentage above ${g.length == 1 ? 0 : g[g.length-1]-1}%!`)
               
            }
            if(object[message.author.id] && !ikl) {
                karthik = object[message.author.id]
                g = obj[message.author.id]
                levels = config[message.author.id]
            for(let i = 0; i < Object.keys(levels).length; i++) {
            if(!karthik.includes(Object.keys(levels)[random])) {
                const embed = new Discord.MessageEmbed()
                .setTitle(`#${random+1} - ${Object.keys(levels)[random]} by ${Object.values(levels)[random].publisher}`)
                .setDescription(`You have to get ${number}%`)
                .setImage(`https://i.ytimg.com/vi/${Object.values(levels)[random].ytcode}/mqdefault.jpg`)
                .setURL(`https://www.youtube.com/watch?v=${Object.values(levels)[random].ytcode}`)
                message.reply({embeds: [embed]})
                g[g.length] = number
                karthik[karthik.length] = Object.keys(levels)[random]
                delete config[message.author.id][Object.keys(levels)[random]]
                await roulette.findById("61ff7b2fbd245cb98f6579fd").updateMany(null, real)
                // message.client.guilds.fetch("904222136661577758").then(guild => {
                //     guild.channels.fetch("904222137278169099").then(async msg => {
                //         msg.send(JSON.stringify(real))
                //     })
                // })
                break;
            } else {
                random = Math.floor(Math.random() * Object.keys(levels).length-1)
                continue;
            }
        }
    } else if(!object[message.author.id] && !ikl) {
        message.reply("Please start the roulette!")
    }
        } 
    }
    }
}