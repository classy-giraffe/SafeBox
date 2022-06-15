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
		try {
			chosenMember = await interaction.options.getUser('user') || interaction.user
			extractBio = `
	**Nickname:** ${chosenMember.username}
	**Discriminator:** ${chosenMember.discriminator}
	**Created At:** ${chosenMember.createdAt}
	**Bot?:** **${chosenMember.bot ? "True" : "False"}${chosenMember.bot ? "" : ", but you never know."}**
	`
			const info = new MessageEmbed()
				.setColor('#55ff55')
				.setTitle('Whois:')
				.setDescription(extractBio)
			interaction.reply({ embeds: [info] });
		}
		catch (err) {
			if (err.message === 'Missing Permissions') {
				await interaction.reply('The bot is missing permissions.');
			}
		}
	},
};