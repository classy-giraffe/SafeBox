const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you want to ban.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason the user was banned for.'),
		),
	async execute(interaction) {
		console.log(interaction.options.data);
		if (interaction.options.getUser('user').id === process.env.CLIENT_ID) {
			const embed = new EmbedBuilder()
				.setColor('#ff5555')
				.addFields(
					{ name: 'Error', value: 'You can\'t ban this bot recursively, please do it manually.' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ embed ], ephemeral: true });
			return;
		}
		if (interaction.guild.me.roles.highest.position <= interaction.options.getMember('user').roles.highest.position) {
			const embed = new EmbedBuilder()
				.setColor('#ff5555')
				.addFields(
					{ name: 'Error', value: 'You can\'t ban somebody who has an equal or higher role than the bot.' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ embed ], ephemeral: true });
			return;
		}
		if (interaction.options.getMember('user').id === interaction.guild.ownerId) {
			const embed = new EmbedBuilder()
				.setColor('#ff5555')
				.addFields(
					{ name: 'Error', value: 'You can\'t ban the server owner.' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ embed ], ephemeral: true });
			return;
		}
		try {
			const user = interaction.options.getUser('user');
			await interaction.guild.members.ban(user);
			const embed = new EmbedBuilder()
				.setColor('#55ff55')
				.addFields(
					{ name: 'Success', value: 'User banned correctly!' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ embed ] });
			await interaction.deleteReply();
		}
		catch (err) {
			const embed = new EmbedBuilder()
				.setColor('#ff5555')
				.addFields(
					{ name: 'Error', value: err.message },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ embed ], ephemeral: true });
		}

	},
};