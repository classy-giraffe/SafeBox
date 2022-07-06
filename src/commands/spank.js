const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spank')
		.setDescription('Spank somebody.')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna spank')
				.setRequired(true),
		),
	async execute(interaction) {
		const spank = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('You gave a spank!')
			.setURL('https://github.com/classy-giraffe')
			.setFooter({ text: 'That\'s <> spanks now!' });
		await interaction.reply({ embeds: [ spank ] });
	},
};