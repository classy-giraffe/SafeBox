const { SlashCommandBuilder } = require('@discordjs/builders');
const { guild } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you want to ban.')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		console.log(guild.members);
		try {
			guild.members.ban(user);
			await interaction.reply('User banned correctly!');
		}
		catch (err) {
			console.error(err);
			await interaction.reply('Something went wrong!');
		}

	},
};