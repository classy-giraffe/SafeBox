const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you want to ban.')
				.setRequired(true)),
	async execute(interaction) {
		if (interaction.options.getUser('user').id === process.env.CLIENT_ID) {
			await interaction.reply('You can\'t ban this bot recursively, please do it manually.');
			return;
		}
		if (interaction.guild.me.roles.highest.position <= interaction.options.getMember('user').roles.highest.position) {
			await interaction.reply('You can\'t ban somebody who has an equal or higher role than the bot.');
			return;
		}
		if (interaction.options.getMember('user').id === interaction.guild.ownerId) {
			await interaction.reply('You can\'t ban the server owner.');
			return;
		}
		try {
			const user = await interaction.options.getUser('user');
			await interaction.guild.members.ban(user);
			await interaction.reply('User banned correctly!');
		}
		catch (err) {
			if (err.message === 'Missing Permissions') {
				await interaction.reply('The bot is missing permissions.');
			}
		}

	},
};