const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const userModel = require('../../models/userSchema.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiss')
		.setDescription('Kiss somebody!')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you wanna kiss.')
				.setRequired(true),
		),
	async execute(interaction) {
		const kiss_sender = interaction.user.id;
		const kiss_receiver = interaction.options.getUser('user').id;
		const profile = await userModel.findOne({
			userID: kiss_receiver,
		});
		profile.kisses++;
		await profile.save();
		const embed = new EmbedBuilder()
			.setColor('#55ff55')
			.setTitle('You gave a kiss!')
			.setURL('https://github.com/classy-giraffe')
			.setDescription(`<@${kiss_sender}> kisses <@${kiss_receiver}>`)
			.setFooter({ text: `That's ${profile.kisses} kisses now!` });
		await interaction.reply({ embeds: [ embed ] });
	},
};