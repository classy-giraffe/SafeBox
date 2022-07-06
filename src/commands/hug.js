const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Kiss somebody!'),
	async execute(interaction) {
    
    },
};