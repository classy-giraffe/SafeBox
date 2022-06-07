require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { MongoClient } = require('mongodb');
const { Client, Collection, Intents } = require('discord.js');
const { token } = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Importing commands (from /commands)
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Initializing MongoDB Connection
const dbURL = process.env.MONGO_INITDB_URL;
const nodeClient = new MongoClient(dbURL);

async function run() {
	try {
		await nodeClient.connect();
		await nodeClient.db('admin').command({ ping: 1 });
		console.log('Connected successfully to MongoDB!');
	}
	finally {
		await nodeClient.close();
	}
}
run().catch(console.dir);

// Initializing Discord Bot instance
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);