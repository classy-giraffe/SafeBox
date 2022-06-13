const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('banlist')
		.setDescription('Shows the current banlist for server.'),
	async execute(interaction) {
		interaction.guild.bans.fetch()
			.then(bans => {
				if (bans.size < 1) {
					interaction.reply('No members are currently banned in this server.');
					return;
				}
				let joinParam = bans.length > 2000 ?
					', ' :// True: For when its practical to make a large paragraph consisting of banned user's names
					'\n'; // False: For when its practical to make a neat list
				let bannedMembers = bans.map(memberItem => memberItem.user.username).join(joinParam);

				const banlist = new MessageEmbed()
					.setColor('#55ff55')
					.setTitle('Banned Members:')
					.setDescription(bannedMembers)
					.setFooter({text: `${bans.size} user(s) are banned`});
				interaction.reply({ embeds: [banlist] });
		})
		.catch(async err => {
			if (err.message === 'Missing Permissions') {
				await interaction.reply('The bot is missing permissions.');
			}
        });

	},
};