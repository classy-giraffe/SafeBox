const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pet')
		.setDescription('Pet somebody!'),
	async execute(interaction) {
    
    },
};