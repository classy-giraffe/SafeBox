import { readdirSync } from 'node:fs';
import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
const clientId: string | undefined = process.env.DISCORD_CLIENT_ID;
const guildId: string | undefined = process.env.GUILD_ID;
const token: string | undefined = process.env.DISCORD_TOKEN;

export default (client) => {
	const commands: Array<String> = [];
	readdirSync('./commands/').forEach(async dir => {
		const files = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
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