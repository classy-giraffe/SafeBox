const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userModel = require('../models/userSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pet')
		.setDescription('Pet somebody!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna pet.')
				.setRequired(true),
		),
	async execute(interaction) {
		const pet_sender = interaction.user.id;
		const pet_receiver = interaction.options.getUser('user').id;
		const profile = await userModel.findOne({
			userID: pet_receiver,
		});
		profile.pets++;
		await profile.save();
		const embed = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('You gave a pet!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${pet_sender}> pets <@${pet_receiver}>`)
			.setFooter({ text: `That's ${profile.pets} pets now!` });
		await interaction.reply({ embeds: [ embed ] });
	},
};