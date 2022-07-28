const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userModel = require('../models/userSchema');

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
		// find number of cookies
		const cookie_receiver = interaction.options.getUser('user').id;
		const cookie_sender = interaction.user.id;
		const profile = await userModel.findOne({
			userID: cookie_receiver,
		});
		const cookies = profile.cookies;
		profile.cookies = cookies + 1;
		await profile.save();
		const cookie = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('You gave a cookie!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${cookie_sender}> gives a cookie to <@${cookie_receiver}>`)
			.setFooter({ text: `That's ${profile.cookies} cookies now!` });
		await interaction.reply({ embeds: [ cookie ] });
	},
};