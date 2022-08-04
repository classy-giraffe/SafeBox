require('dotenv').config();
const mongoose = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = process.env.DISCORD_TOKEN;
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
	],
});

// Handler
client.aliases = new Collection();
client.slashCommands = new Collection();
module.exports = client;

['commands', 'events'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

// Initializing MongoDB Connection
const URI = process.env.MONGO_INITDB_URL;
try {
	mongoose.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('Connected to MongoDB!');
}
catch (err) {
	console.error(err);
}

// Login to Discord API
client.login(token);