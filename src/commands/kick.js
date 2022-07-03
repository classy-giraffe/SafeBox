const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you want to kick.')
				.setRequired(true)),
	async execute(interaction) {
		if (interaction.options.getUser('user').id === process.env.CLIENT_ID) {
			await interaction.reply('You can\'t kick this bot recursively, please do it manually.');
			return;
		}
		if (interaction.guild.me.roles.highest.position <= interaction.options.getMember('user').roles.highest.position) {
			await interaction.reply('You can\'t kick somebody who has an equal or higher role than the bot.');
			return;
		}
		if (interaction.options.getMember('user').id === interaction.guild.ownerId) {
			await interaction.reply('You can\'t kick the server owner.');
			return;
		}
		try {
			const user = await interaction.options.getUser('user');
			await interaction.guild.members.kick(user);
			await interaction.reply('User kicked correctly!');
		}
		catch (err) {
			if (err.message === 'Missing Permissions') {
				await interaction.reply('The bot is missing permissions.');
			}
		}

	},
};