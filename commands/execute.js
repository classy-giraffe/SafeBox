const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const { spawn } = require('node:child_process');
const { util } = require('node:util');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('execute')
		.setDescription('Execute shell code inside a Docker container.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true)),
	async execute(interaction) {
		try {
			await util.promisify(spawn(Client));
		}
		catch (error) {
			console.log(error);
			await interaction.reply('Something went wrong while executing the command.');
		}
	},
};