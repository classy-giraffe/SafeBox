const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug somebody!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna hug')
				.setRequired(true),
		),
	async execute(interaction) {
		const hug = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('gives a hug to')
			.setURL('https://github.com/classy-giraffe')
			.setFooter({ text: 'That\'s <> hugs now!' });
		await interaction.reply({ embeds: [ hug ] });
	},
};