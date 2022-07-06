const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slap')
		.setDescription('Slap somebody!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna slap')
				.setRequired(true),
		),
	async execute(interaction) {
		const slap_sender = interaction.user.id;
		const slap_receiver = interaction.options.getUser('user').id;
		const slap = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('You gave a slap!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${slap_sender}> slaps <@${slap_receiver}>`)
			.setFooter({ text: 'That\'s <> slaps now!' });
		await interaction.reply({ embeds: [ slap ] });
	},
};