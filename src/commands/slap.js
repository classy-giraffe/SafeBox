const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const userModel = require('../models/userSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slap')
		.setDescription('Slap somebody!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna slap.')
				.setRequired(true),
		),
	async execute(interaction) {
		const slap_sender = interaction.user.id;
		const slap_receiver = interaction.options.getUser('user').id;
		const profile = await userModel.findOne({
			userID: slap_receiver,
		});
		profile.slaps++;
		await profile.save();
		const embed = new EmbedBuilder()
			.setColor('#55ff55')
			.setTitle('You gave a slap!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${slap_sender}> slaps <@${slap_receiver}>`)
			.setFooter({ text: `That's ${profile.slaps} slaps now!` });
		await interaction.reply({ embeds: [ embed ] });
	},
};