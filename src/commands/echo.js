const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echos whatever you send.')
		.addStringOption(option =>
			option.setName('msg')
				.setDescription('The message you want to send.')
				.setRequired(true)),
	async execute(interaction) {
		let echoMessage = interaction.options.getString('msg');
		console.log(echoMessage)
			const info = new MessageEmbed()
			.setColor('#55ff55')
			.setTitle('Echo:')
				.setDescription(`\`\`\`${echoMessage}\`\`\``)
				.setFooter({ text: 'Another message generated using the echo command' })
		interaction.reply({ embeds: [info] });

	},
};