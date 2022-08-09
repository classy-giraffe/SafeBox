import { readdirSync } from 'node:fs';
import { ApplicationCommandDataResolvable, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

export default (client: any) => {
	const commands: ApplicationCommandDataResolvable[] = [];
	readdirSync('src/commands').forEach(async dir => {
		const files = readdirSync(`src/commands/${dir}/`).filter(file => file.endsWith('.ts'));
		for (const file of files) {
			import(`../commands/${dir}/${file}`)
				.then(module => {
					const command = module.default;
					commands.push(command.data.toJSON())
					client.commands.set(command.data.name, command);})
				.catch(console.error);
		}
	});
	const rest = new REST({ version: '10' }).setToken(token as string);
	console.log('Started refreshing application (/) commands.');
	rest.put(Routes.applicationGuildCommands(clientId as string, guildId as string), { body: commands })
		.then(() => console.log('Successfully reloaded application (/) commands.'))
		.catch(console.error);
};