const fs = require('fs');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;
const rest = new REST({ version: '9' }).setToken(token);

module.exports = (client) => {
	const commands = [];

	fs.readdirSync('./commands/').forEach(async dir => {
		const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
		for (const file of files) {
			const command = require(`../commands/${dir}/${file}`);
			commands.push({
				name: command.name,
				description: command.description,
				type: command.type,
				options: command.options ? command.options : null,
				default_permission: command.default_permission ? command.default_permission : null,
				default_member_permissions: command.default_member_permissions ? PermissionsBitField.resolve(command.default_member_permissions).toString() : null,
			});
			if (command.name) {
				client.commands.set(command.name, command);
				console.log(command);
			}
			else {
				console.error('Something went wrong.');
			}
		}

	});

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');
			await rest.put(
				guildId ?
					Routes.applicationGuildCommands(clientId, guildId) :
					// Routes.applicationCommands(clientId),
					{ body: commands },
			);
			console.log('Successfully reloaded application (/) commands.');
		}
		catch (error) {
			console.log(error);
		}
	})();
};