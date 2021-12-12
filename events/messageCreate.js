
module.exports = {
    name: "messageCreate",
    execute(message) {
        const Discord = require("discord.js")
        var object = require("../JSON/commands.json").array.levels 
        var obj = require("../JSON/commands.json").array.percent
        const prefix = ".."
        let args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        var allowedChannels = [
            "671454973346840616",
            "919475035750670360"
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
            var levels = require("../JSON/levels.json")
            var leaderboard = require("../JSON/leaderboard.json")
            var array = []
            var array2 = []
            var array3 = []
            for(let i = 0; i < Object.keys(levels).length; i++) {
                for(let j = 0; j < Object.values(levels)[i].list.length; j++) {
                    array.push(`${Object.values(levels)[i].list[j].name}, ${Object.values(levels)[i].name}`)
                }
            }
            for(let i = 0; i < Object.keys(leaderboard).length; i++) {
                for(let j = 0; j < Object.values(leaderboard)[i].levels.length; j++) {
                    array2.push(`${Object.keys(leaderboard)[i]}, ${Object.values(leaderboard)[i].levels[j]}`)
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
            var karthik;
            var g;
            var levels = require("../JSON/levels.json")
            var number = parseInt(args[0])+1
            var random = Math.floor(Math.random() * Object.keys(levels).length-4)
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
                if(message.client.users.cache.find(user => user.id == args[1])) {
                    const id = message.author.id
                    message.channel.send(`<@${message.client.users.cache.find(user => user.id == args[1]).id}>, do you want to join a roulette?`)
                    const filter = m => m.author.id === message.client.users.cache.find(user => user.id == args[1]).id;
                    const collector = message.channel.createMessageCollector(filter, {time: 10000});
                    collector.on("collect", msg => {
                        if(!msg.author.bot) {
                        if(msg.content == "yes") {
                             msg.channel.send(`<@${id}>, This person has approved your request`)
                            collector.stop()
                        } else if(msg.content == "no") {
                            msg.channel.send(`<@${id}>, This person has declined your request`)
                            collector.stop()
                        } else {
                            return msg.channel.send("Send a valid response! (either yes or no)")
                        }
                    }
                    })
                } else {
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
            j = `Levels: ${karthik.length}\nWorkng on: ${karthik[karthik.length-1]} ${g[g.length-1].toString()}%`
        }
        var embedScore = new Discord.MessageEmbed()
            .setDescription(j)
            .setTitle(`Score: ${karthik.length-1}`)
           return message.reply({embeds: [embedScore]})
    }
            if(args[0] == "end" && !object[message.author.id]) {
                 return message.reply("Please start a roulette before you want to end it!")
            } else if(args[0] == "end" && object[message.author.id]) {
                g = obj[message.author.id]
                karthik = object[message.author.id]
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
                message.client.guilds.fetch("904222136661577758").then(guild => {
                    guild.channels.fetch("904222137278169099").then(msg => {
                        msg.send(JSON.stringify(require("../JSON/commands.json").array))
                    })
                })
                return message.reply({content: `You have ended the roulette at ${number}% on ${karthik[karthik.length-1]}! Thanks for playing :)`, embeds: [embed]})
            }
            if(args[0] == "start" && !object[message.author.id]) {
                object[message.author.id] = [
    
                ]
                karthik = object[message.author.id]
                obj[message.author.id] = [
    
                ]
                g = obj[message.author.id]
                number = 1
            } else {
                g = obj[message.author.id]
                if(args[0] == "start" && object[message.author.id]) return message.reply("You already have an instance of a roulette! Use ..roulette end to end your current session.")
                if(parseInt(args[0]) < 0) return message.reply("Please input a valid whole number!");
                if(parseInt(args[0]) >= 101) return message.reply("Please input a percentage below 101%");
                if(parseInt(args[0]) == 100 && object[message.author.id]) {
                    delete object[message.author.id]
                    delete obj[message.author.id]
                    message.client.guilds.fetch("904222136661577758").then(guild => {
                        guild.channels.fetch("904222137278169099").then(msg => {
                            msg.send(JSON.stringify(require("../JSON/commands.json").array))
                        })
                    })
                    return message.reply("Congratulations, you've completed the lrr roulette! Now quit gd smh")
                }
                if(parseInt(args[0]) < g[g.length-1]) return message.reply(`Please input a percentage above ${number-1}%!`)
               
            }
            if(object[message.author.id]) {
                karthik = object[message.author.id]
                g = obj[message.author.id]
            for(let i = 0; i < Object.keys(levels).length; i++) {
            if(!karthik.includes(Object.keys(levels)[random])) {
                const embed = new Discord.MessageEmbed()
                .setTitle(`#${random+1} - ${Object.keys(levels)[random]} by ${Object.values(levels)[random].publisher}`)
                .setDescription(`You have to get ${number}%`)
                .setImage(`https://i.ytimg.com/vi/${Object.values(levels)[random].ytcode}/mqdefault.jpg`)
                .setURL(`https://www.youtube.com/watch?v=${Object.values(levels)[random].ytcode}`)
                message.reply({embeds: [embed]})
                g.push(number)
                karthik.push(Object.keys(levels)[random])
                message.client.guilds.fetch("904222136661577758").then(guild => {
                    guild.channels.fetch("904222137278169099").then(msg => {
                        msg.send(JSON.stringify(require("../JSON/commands.json").array))
                    })
                })
                break;
            } else {
                random = Math.floor(Math.random() * Object.keys(levels).length-1)
                continue;
            }
        }
    } else {
        message.reply("Please start the roulette!")
    }
        } 
    }
    }
}