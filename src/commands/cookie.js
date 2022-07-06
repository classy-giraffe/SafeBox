const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cookie')
		.setDescription('Give somebody a cookie.')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna give a cookie to.')
				.setRequired(true),
		),
	async execute(interaction) {
		const cookie_sender = interaction.user.id;
		const cookie_receiver = interaction.options.getUser('user').id;
		const cookie = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('You gave a cookie!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${cookie_sender}> gives a cookie to <@${cookie_receiver}>`)
			.setFooter({ text: 'That\'s <> cookies now!' });
		await interaction.reply({ embeds: [ cookie ] });
	},
};