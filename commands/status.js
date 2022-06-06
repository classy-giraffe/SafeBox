const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { MessageEmbed, version } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Print informations about the bot.'),
	async execute(interaction) {
		const memory = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;
		const status = new MessageEmbed()
			.setColor('#55ff55')
			.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/tick.png')
			.addFields(
				{ name: 'Platform', value: codeBlock(process.platform) },
				{ name: 'Node.js version', value: codeBlock(process.versions.node) },
				{ name: 'Discord.js version', value: codeBlock(version) },
				{ name: 'Used memory', value: codeBlock(`${memory} MB`) },
			)
			.setTimestamp();
		await interaction.reply({ embeds: [ status ] });
	},
};