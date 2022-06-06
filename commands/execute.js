const util = require('node:util');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const exec = util.promisify(require('node:child_process').exec);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('execute')
		.setDescription('Execute bash code inside a Docker container.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The command you want to execute.')
				.setRequired(true)),
	async execute(interaction) {
		const input = await interaction.options.getString('input');
		const startup = Date.now();
		try {
			const { stdout } = await exec(input);
			const diff = Date.now() - startup;
			const commandEmbed = new MessageEmbed()
				.setColor('#55ff55')
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/tick.png')
				.addFields(
					{ name: 'Input', value: codeBlock(input) },
					{ name: 'Output', value: codeBlock(stdout) },
				)
				.setTimestamp()
				.setFooter({ text: `It took ${diff}ms` });
			await interaction.reply({ embeds: [ commandEmbed ] });
		}
		catch (error) {
			const diff = Date.now() - startup;
			const commandEmbed = new MessageEmbed()
				.setColor('#ff5555')
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/error.png')
				.addFields(
					{ name: 'Input', value: codeBlock(input) },
					{ name: 'Output', value: codeBlock(error) },
				)
				.setTimestamp()
				.setFooter({ text: `It took ${diff}ms` });
			await interaction.reply({ embeds: [ commandEmbed ] });
		}
	},
};