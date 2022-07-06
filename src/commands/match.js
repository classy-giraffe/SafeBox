const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('match')
		.setDescription('Give somebody a cookie.')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna give a cookie to.')
				.setRequired(true),
		),
	async execute(interaction) {
		const cookie = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('gives a cookie to')
			.setURL('https://github.com/classy-giraffe')
			.setFooter({ text: 'That\'s <> cookies now!' });
		await interaction.reply({ embeds: [ cookie ] });
	},
};