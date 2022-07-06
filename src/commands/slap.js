const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Slap')
		.setDescription('Slap somebody!'),
	async execute(interaction) {
    
    },
};