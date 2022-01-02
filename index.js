const fs = require('fs');
const { Client, Collection } = require('discord.js');
const Discord = require("discord.js")

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

/*client.on("messageCreate", message => {
	message.client.guilds.fetch("904222136661577758").then(guild => {
		guild.channels.fetch("904222137278169099").then(msg => {
			msg.lastMessage
		})
	})
})*/

 
client.login(process.env.token);