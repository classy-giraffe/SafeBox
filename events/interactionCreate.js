const profileModel = require('../models/profileSchema');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = await interaction.client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
			const profile = await profileModel.create({
				userID: interaction.user.id,
				userTag: interaction.user.tag,
				guildID: interaction.guild.id,
			});
			await profile.save();
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};