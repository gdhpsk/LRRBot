const fs = require('fs');
const { Client, Collection } = require('discord.js');
const Discord = require("discord.js")
const mongoose = require("mongoose")
const cron = require("node-cron")

mongoose.connect(`mongodb+srv://gdlrrapi:${process.env.mongoPass}@gdlrrapi.2rdel.mongodb.net/gdlrrdemonlist`) 

const client = new Client({ partials: ["CHANNEL", "MESSAGE", "REACTION"], intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"]});

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

const commands = [];

client.commands = new Collection() 

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"))

for(const file of eventFiles) {
	const events = require(`./events/${file}`)

	if(events.once) {
		client.once(events.name, (...args) => events.execute(...args, commands))
	} else {
		client.on(events.name, (...args) => events.execute(...args, commands))
	}
}

client.on("ready", () => {
	cron.schedule('0 9 * * *', () => {
		let guild = client.guilds.cache.get("865458968179900416")
		let channel = guild.channels.cache.get("866550383295594506")
		channel.send('running a task every day (shift test guys)');
	  });
})

 
client.login(process.env.token)