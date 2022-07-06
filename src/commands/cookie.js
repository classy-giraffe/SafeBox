const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cookie')
		.setDescription('Give somebody a cookie.'),
	async execute(interaction) {
    
    },
};