const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const murmurhash = require('murmurhash');

async function affinityCheck(primaryID, secondaryID) {
	const x = Math.floor(primaryID);
	const y = Math.floor(secondaryID);
	const z = Math.log(Math.floor((x + y) / 2)).toString();
	return murmurhash.v3(z);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('match')
		.setDescription('Check the affinity between two users.')
		.addUserOption(option =>
			option
				.setName('main_user')
				.setDescription('The user you wanna check the affinity of.')
				.setRequired(true),
		)
		.addUserOption(option =>
			option
				.setName('optional_user')
				.setDescription('The user you wanna check the affinity of in case you have two users.'),
		),
	async execute(interaction) {
		if (!interaction.options.getUser('optional_user')) {
			const mainUserID = interaction.options.getUser('main_user').id;
			const interactionUserID = interaction.user.id;
			const affinity = await affinityCheck(mainUserID, interactionUserID);
			console.log(affinity);
		}
		else {
			const mainUserID = interaction.options.getUser('main_user').id;
			const optionalUserID = interaction.options.getUser('optional_user').id;
			const affinity = await affinityCheck(mainUserID, optionalUserID);
			console.log(affinity);
		}
	},
};