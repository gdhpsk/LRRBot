# LRRBot

This is the repository for the bot in the Low Refresh Rate Server! This README.md file will tell you how the bot works and show you how to make your own instance of one as well! 
This bot was made by [gdhpsk](https://github.com/gdhpsk/), and is a completely JavaScript based bot with 7 commands. 

## Slash Commands

#### How they work

How the Slash Commands work is that if you go into the file [ready.js](https://github.com/gdhpsk/LRRBot/blob/main/events/ready.js), Theres basically Discord's REST api and their Routes.
For **setting a status to the bot**, we use this piece of code: 

```
client.user.setActivity("The LRR Demonlist Server", {type: "WATCHING"})
```

For adding **new Slash Commands**, it is automatically done by this: 

```
(async () => {
		try {
			if(process.env.ENV === "production") {
				await rest.put(Routes.applicationCommands(CLIENT_ID), {
					body: commands
				})
				console.log("Slash Commands worked (globally)");
			} else {
				await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
					body: commands
				})
				console.log("Slash Commands worked (locally)"); 
			}
		} catch (err) {
			if(err) console.log(err)
		}
	})()
```

Basically if in our [.env](https://github.com/gdhpsk/LRRBot/blob/main/.env) file, if ENV=production, then the **slash commands will work globally**, meaning in all servers.
IF however it does not equal to production, then it'll only work in whatever guild ID you put in the [config.json](https://github.com/gdhpsk/LRRBot/blob/main/config.json) file.
The console.log() functions you see here **are not required**, but are **good for testing** if something works. We used a try catch block to see what the error is if there is one.

#### Executing Slash Commands

First of all, before you make an instance of this bot, make sure you remove this piece of code in [interactionCreate.js](https://github.com/gdhpsk/LRRBot/blob/main/events/interactionCreate.js) if you want the bot to work in your server!:

```
if(interaction.channel.type != "DM") {
			if(!allowedChannels.includes(interaction.channel.id)) return
	}
```

You also have to remove the allowedChannels variable. Basically, you have to remove these because TyPier decided to not set perms up for the bot in the LRR Server, so it'll only work in the LRR server if you don't remove this.<br/>
Of course, if you do have a better understanding of how all this works, then you may be able to reconfigure it for specifically your server, but if youre a noob at JS, please remove this.

Back to the main part, basically, you get the command name with this piece of code:

```
const command = interaction.client.commands.get(interaction.commandName)
if(!command) return;
```

The second line of code is basically saying if it can't find a command name you're inputting, it'll just do nothing. Getting the name of a command is done by using the variable interaction.commandName (interaction just means slash commands).

Executing a specific command is done using this piece of code:

```
try {
		await command.execute(interaction, Discord, interaction.client)
	} catch (err) {
		if(err) {
			console.log(err)
			await interaction.reply({content: "An error occured while trying to execute this command.", ephemeral: true})
		}
	}
```

This is also a try catch block, and is a promise. To execute a command, you basically need the actual interaction, the Discord api, and the Discord client (aka your bot), which you can see here. If there is an error, it'll only reply to the user that something has gone wrong.

## Slash Command Location

All slash commands are located in the folder [commands](https://github.com/gdhpsk/LRRBot/tree/main/commands). To create a new Slash Command, you have to start off with this code:

```
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("name")
    .setDescription("Description")
    async execute(interaction, Discord, client) {
        // code here
    }
}
```
This README is not meant to be a discord.js v13 tutorial, so if you're interested on learning more about slash commands, do search it up on your own.

## Text Commands

Text commands can be created in the file [messageCreate.js](https://github.com/gdhpsk/LRRBot/blob/main/events/messageCreate.js), however, just like before, if you're a JS noob, remove these parts of code (if you want to make an instance of your own):

```
var allowedChannels = [
            "671454973346840616",
            "919475035750670360"
]
```
and
```
if(message.channel.type != "DM") {
            if(!allowedChannels.includes(message.channel.id)) return;
}
```

How Text Commands work is that you get the content of a message, and based on that, you can execute a piece of code. This is way easier for beginners to understand, So if you want to make your own instance of LRRBot with custom commands, This is a good place to start.

## More info about commands used in LRRBot

All of your code runs in the [index.js](https://github.com/gdhpsk/LRRBot/blob/main/index.js) file, which is basically the core. Partials can be changed depending on what commands you make, but you can research more about those on your own.<br/>
All of the point calculating for the leaderboard/levels is done in the [point_calculator_stuff](https://github.com/gdhpsk/LRRBot/tree/main/point_calculator_stuff) folder (just don't ask why theres 2 level point calculators :trol:).<br/>
Lastly, all the JSON data needed for the bot such as getting all the levels, the leaderboard, etc., is put in the [JSON](https://github.com/gdhpsk/LRRBot/tree/main/JSON) folder.

## Creating your own LRRBot

This part will be going by number order, so I will list all the steps in order.

#1. (Skip to step 4 if you already made a bot) In [Discord Developer Portal](https://discord.com/developers/), Press on New Application (name it whatever you'd like).<br/>
#2. Go to the bot tab, and make it a bot.<br/>
#3. Make sure you keep your token secret and with you, you will need it later in this tutorial.<br/>
#4. Download [Visual Studio Code](https://code.visualstudio.com/) and [Node.js](https://nodejs.org/en/) (download the one recommended for most users).<br />
#5. Download all the code on this repository, put it in a folder if it already isnt in one, and then open it up in Visual Studio Code. <br/>
#6. Review the parts earlier in this file, and make those changes on yours.<br/>
#7. In the .env file, make a new entry called token. this is where your bot token will go. Ex: token=yourtoken.<br/>
#8. In your Visual Studio Code terminal, run node . or node index.js, and there you go!<br/>
#9. if you want to host the bot on heroku like I did, watch this [video](https://www.youtube.com/watch?v=zKfjR_xwLm4).

# Have fun experimenting! Ask any questions on discord (gdhpsk#0001)
