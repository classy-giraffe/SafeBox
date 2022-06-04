const util = require('node:util');
const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const exec = util.promisify(require('node:child_process').exec);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('execute')
		.setDescription('Execute shell code inside a Docker container.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The code you want to execute')
				.setRequired(true)),
	async execute(interaction) {
		const input = await interaction.options.getString('input');
		try {
			const { stdout } = await exec(input);
			const commandEmbed = new MessageEmbed()
				.setColor('#55ff55')
				.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/tick.png')
				.addFields(
					{ name: 'Input', value: codeBlock(input) },
					{ name: 'Output', value: codeBlock(stdout) },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ commandEmbed ] });
		}
		catch (error) {
			const commandEmbed = new MessageEmbed()
				.setColor('#ff5555')
				.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/error.png')
				.addFields(
					{ name: 'Input', value: codeBlock(input) },
					{ name: 'Output', value: codeBlock(error) },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ commandEmbed ] });
		}
	},
};