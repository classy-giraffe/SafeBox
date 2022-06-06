const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Print informations about the bot'),
	async execute(interaction) {
		const status = new MessageEmbed()
			.setColor('#55ff55')
			.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/tick.png')
			.addFields(
				{ name: 'Node dependencies:', value: codeBlock(process.versions) },
				{ name: 'Node.js version:', value: codeBlock(process.versions.node) },
			)
			.setTimestamp();
		await interaction.reply({ embeds: [ status ] });
	},
};