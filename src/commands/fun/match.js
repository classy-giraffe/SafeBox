const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const userModel = require('../../models/userSchema.js');

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
				.setDescription('Optional parameter to check the affinity between two users.'),
		),
	async execute(interaction) {
		if (!interaction.options.getUser('optional_user')) {
			const primaryUser = interaction.options.getUser('main_user').id;
			const secondaryUser = interaction.user.id;
			let primaryProfile;
			let secondaryProfile;
			try {
				primaryProfile = await userModel.findOne({
					userID: primaryUser,
					matches: { $exists: true },
				});
				secondaryProfile = await userModel.findOne({
					userID: secondaryUser,
					matches: { $exists: true },
				});
				if (!primaryProfile.matches.has(secondaryUser) || !secondaryProfile.matches.has(primaryUser)) {
					const affinity = Math.floor(Math.random() * 100);
					primaryProfile.matches.set(secondaryUser, affinity);
					secondaryProfile.matches.set(primaryUser, affinity);
					await primaryProfile.save();
					await secondaryProfile.save();
				}
			}
			catch (err) {
				console.error(err);
			}
			const embed = new EmbedBuilder()
				.setColor('#55ff55')
				.setTitle('Affinity Check')
				.setURL('https://github.com/classy-giraffe')
				.setDescription(`Your affinity with <@${secondaryUser}> is ${primaryProfile.matches.get(secondaryUser)}%`)
				.setFooter({ text: 'something' });
			await interaction.reply({ embeds: [ embed ] });
		}
		else {
			const primaryUser = interaction.options.getUser('main_user').id;
			const secondaryUser = interaction.options.getUser('optional_user').id;
			let primaryProfile;
			let secondaryProfile;
			try {
				primaryProfile = await userModel.findOne({
					userID: primaryUser,
					matches: { $exists: true },
				});
				secondaryProfile = await userModel.findOne({
					userID: secondaryUser,
					matches: { $exists: true },
				});
				if (!primaryProfile.matches.has(secondaryUser) || !secondaryProfile.matches.has(primaryUser)) {
					const affinity = Math.floor(Math.random() * 100);
					primaryProfile.matches.set(secondaryUser, affinity);
					secondaryProfile.matches.set(primaryUser, affinity);
					await primaryProfile.save();
					await secondaryProfile.save();
				}
			}
			catch (err) {
				console.error(err);
			}
			const embed = new EmbedBuilder()
				.setColor('#55ff55')
				.setTitle('Affinity Check')
				.setURL('https://github.com/classy-giraffe')
				.setDescription(`The affinity between <@${primaryUser}> and <@${secondaryUser}> is ${primaryProfile.matches.get(secondaryUser)}%`)
				.setFooter({ text: 'something' });
			await interaction.reply({ embeds: [ embed ] });
		}
	},
};