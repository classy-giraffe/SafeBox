const { SlashCommandBuilder } = require('@discordjs/builders');
const { spawn } = require('node:child_process');
const { util } = require('node:util');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('execute')
		.setDescription('Execute shell code inside a Docker container.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The code you want to execute')
				.setRequired(true)),
	async execute(interaction) {
		try {
			const input = interaction.options.getString('input');
			console.log(input);
			await util.promisify(spawn(input));
		}
		catch (error) {
			console.log(error);
			await interaction.reply('Something went wrong while executing the command.');
		}
	},
};