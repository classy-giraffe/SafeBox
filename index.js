require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
const { Client, Collection, Intents } = require('discord.js');
const { token } = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Importing commands (from ./commands)
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Importing events (from ./events)
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Initializing MongoDB Connection
const dbURL = process.env.MONGO_INITDB_URL;
try {
	mongoose.connect(dbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('Connected to MongoDB!');
}
catch (err) {
	console.error(err);
}

client.login(token);