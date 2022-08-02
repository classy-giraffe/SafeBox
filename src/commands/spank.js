const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userModel = require('../models/userSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spank')
		.setDescription('Spank somebody!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna spank.')
				.setRequired(true),
		),
	async execute(interaction) {
		const spank_sender = interaction.user.id;
		const spank_receiver = interaction.options.getUser('user').id;
		const profile = await userModel.findOne({
			userID: spank_receiver,
		});
		profile.spanks++;
		await profile.save();
		const embed = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('You gave a spank!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${spank_sender}> spanks <@${spank_receiver}>`)
			.setFooter({ text: `That's ${profile.spanks} spanks now!` });
		await interaction.reply({ embeds: [ embed ] });
	},
};