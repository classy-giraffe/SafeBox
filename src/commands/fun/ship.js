const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ship')
		.setDescription('Marry two users.')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna marry.')
				.setRequired(true),
		),
	async execute(interaction) {
		console.log(interaction);
	},
};