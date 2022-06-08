const interactionLog = require('../models/interactionSchema');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = await interaction.client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
			const interactionInfo = await interactionLog.create({
				authorUserId: interaction.user.id,
				authorUserTag: interaction.user.tag,
				guildId: interaction.guild.id,
				channelId: interaction.channelId,
				id: interaction.id,
				createdAt: interaction.createdAt,
				interaction: {
					name: interaction.commandName,
					parameters: interaction.options?._hoistedOptions[0]?.value,
				},
			});
			await interactionInfo.save();
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};