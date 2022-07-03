const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whois')
		.setDescription('Shows informaion about yourself or a particular user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you want info about.')),
	async execute(interaction) {
		console.log('hi');
	},
};