const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const Discord = require("discord.js")
const mongoose = require("mongoose")
const cron = require("node-cron")
const dayjs = require("dayjs")

mongoose.connect(`mongodb+srv://gdlrrapi:${process.env.mongoPass}@gdlrrapi.2rdel.mongodb.net/gdlrrdemonlist`) 

const client = new Client({ partials: [Partials.Channel, Partials.Message, Partials.Reaction], intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent]});

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
		client.once(events.name, (...args) => {
			try {
				events.execute(...args, commands)
			} catch(e) {
				console.log(e)
			}
		})
	} else {
		client.on(events.name, (...args) => {
		try {
			events.execute(...args, commands)
		} catch(e) {
			console.log(e)
		}
	})
	}
}

client.on("ready", () => {
	let array = [
		{
			"date": "Mon",
			"people": "<@274707237958713355> and <@269622527859490817>"
		},
		{
			"date": "Tue",
			"people": "<@694266359630004324> and <@327717701130780673>"
		},
		{
			"date": "Wed",
			"people": "<@703364595321929730> and <@652297356368150530>"
		},
		{
			"date": "Thu",
			"people": "<@469042391093870612> and <@652297356368150530>"
		},
		{
			"date": "Fri",
			"people": "<@763877586425086002>, <@786998746206568448>, and <@435079431627997184>"
		},
		{
			"date": "Sat",
			"people": "<@582690478047232001> and <@529131517579100172>"
		},
		{
			"date": "Sun",
			"people": "<@660605578158145546>, <@347658809902366722>, and <@414186975696781314>"
		}
	]
	cron.schedule('0 0,8,16 * * *', () => {
		let guild = client.guilds.cache.get("865458968179900416")
		let channel = guild.channels.cache.get("866550383295594506")
		let day = dayjs(Date.now()).format("ddd")
		channel.send(`${array[array.findIndex(e => e.date == day)].people}, it's your shift time!`)
	  });
})

 
client.login(process.env.token)