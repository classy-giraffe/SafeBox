const fs = require('fs');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

module.exports = (client) => {
	const commands = [];
	fs.readdirSync('./commands/').forEach(async dir => {
		const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
		for (const file of files) {
			const command = require(`../commands/${dir}/${file}`);
			commands.push(command.data.toJSON());
			client.commands.set(command.data.name, command);
		}
	});
	const rest = new REST({ version: '10' }).setToken(token);
	console.log('Started refreshing application (/) commands.');
	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.log('Successfully reloaded application (/) commands.'))
		.catch(console.error);
};