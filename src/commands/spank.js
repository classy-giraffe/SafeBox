const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Spank')
		.setDescription('Spank somebody!'),
	async execute(interaction) {
    
    },
};