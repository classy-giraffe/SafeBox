require('dotenv').config();
const mongoose = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const URI = process.env.MONGO_INITDB_URL;
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
	],
});

// Initializing MongoDB Connection
try {
	mongoose.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		family: 4,
	});
	console.log('Connected to MongoDB!');
}
catch (err) {
	console.error(err);
}

// Handlers
client.commands = new Collection();
module.exports = client;

['commands', 'events'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

// Login to Discord API
client.login(token);