const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiss')
		.setDescription('Kiss somebody!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna kiss')
				.setRequired(true),
		),
	async execute(interaction) {
		const kiss = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('gives a kiss to')
			.setURL('https://github.com/classy-giraffe')
			.setFooter({ text: 'That\'s <> kisss now!' });
		await interaction.reply({ embeds: [ kiss ] });
	},
};