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
		const hug_sender = interaction.user.id;
		const hug_receiver = interaction.options.getUser('user').id;
		const hug = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('You gave a hug!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${hug_sender}> hugs <@${hug_receiver}>`)
			.setFooter({ text: 'That\'s <> hugs now!' });
		await interaction.reply({ embeds: [ hug ] });
	},
};