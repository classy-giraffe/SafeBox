const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userModel = require('../models/userSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('match')
		.setDescription('Check the affinity between two users.')
		.addUserOption(option =>
			option
				.setName('main_user')
				.setDescription('The user you wanna check the affinity of.')
				.setRequired(true),
		)
		.addUserOption(option =>
			option
				.setName('optional_user')
				.setDescription('The user you wanna check the affinity of in case you have two users.'),
		),
	async execute(interaction) {
		if (!interaction.options.getUser('optional_user')) {
			const primaryUser = interaction.options.getUser('main_user').id;
			const secondaryUser = interaction.user.id;
			let profile;
			try {
				profile = await userModel.findOne({
					userID: primaryUser,
					matches: { $exists: true },
				});
				if (!profile.matches.has(secondaryUser)) {
					const affinity = Math.floor(Math.random() * 100);
					profile.matches.set(secondaryUser, affinity);
					await profile.save();
				}
			}
			catch (err) {
				console.error(err);
			}
			const embed = new MessageEmbed()
				.setColor('#55ff55')
				.setTitle('Affinity Check')
				.setURL('https://github.com/classy-giraffe')
				.setDescription(`Your affinity with <@${secondaryUser}> is ${profile.matches.get(secondaryUser)}%`)
				.setFooter({ text: 'something' });
			await interaction.reply({ embeds: [ embed ] });
		}
		else {
			const primaryUser = interaction.options.getUser('main_user').id;
			const secondaryUser = interaction.options.getUser('optional_user').id;
			let profile;
			try {
				profile = await userModel.findOne({
					userID: primaryUser,
					matches: { $exists: true },
				});
				if (!profile.matches.has(secondaryUser)) {
					const affinity = Math.floor(Math.random() * 100);
					profile.matches.set(secondaryUser, affinity);
					await profile.save();
				}
			}
			catch (err) {
				console.error(err);
			}
			const embed = new MessageEmbed()
				.setColor('#55ff55')
				.setTitle('Affinity Check')
				.setURL('https://github.com/classy-giraffe')
				.setDescription(`The affinity between <@${primaryUser}> and <@${secondaryUser}> ${profile.matches.get(secondaryUser)}%`)
				.setFooter({ text: 'something' });
			await interaction.reply({ embeds: [ embed ] });
		}
	},
};