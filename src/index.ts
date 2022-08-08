import commands from './types/common/discord';
import mongoose, { MongooseOptions } from 'mongoose';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
const token = process.env.DISCORD_TOKEN;
const URI = process.env.MONGO_INITDB_URL;
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
	],
});

// Initializing MongoDB Connection and logging in
(async () => {
	try {
		console.log(`Connecting to MongoDB...`);
		await mongoose.connect(URI as string, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			family: 4,
		} as MongooseOptions);
		console.log('Connected to MongoDB!');
		console.log("Initializing Discord Client...");
		await client.login(token);
	}
	catch (err) {
		console.error(err);
	}
})();

// Importing Events and Commands
module.exports = client;
client.commands = new Collection();
['commands', 'events'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});