const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pet')
		.setDescription('Pet somebody!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna pet')
				.setRequired(true),
		),
	async execute(interaction) {
		const pet_sender = interaction.user.id;
		const pet_receiver = interaction.options.getUser('user').id;
		const pet = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('You gave a pet!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${pet_sender}> pets <@${pet_receiver}>`)
			.setFooter({ text: 'That\'s <> pets now!' });
		await interaction.reply({ embeds: [ pet ] });
	},
};