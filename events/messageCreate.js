
module.exports = {
    name: "messageCreate",
    execute(message) {
        if(message.content.toLowerCase() == "femboy") {
            message.reply("OwO UwU")
        } 
        if(message.content.toLowerCase() == "fake skill") {
            message.reply("🤮")
        }
         if(message.content.toLowerCase().includes("360")) {
            message.reply("All y'all high refresh players who think Sonic Wave is easier then Erebus, first of all shut the fuck up and 2nd of all of the wave plays by itself for you guys.")
        } 
        if(message.content.toLowerCase().includes("fluke")) {
            message.reply("https://media.discordapp.net/attachments/396433111245914112/832804446081122304/Fluker_is_talking.gif")
        }
    }
}