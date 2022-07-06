const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ship')
		.setDescription('Ship with somebody!'),
	async execute(interaction) {
    
    },
};