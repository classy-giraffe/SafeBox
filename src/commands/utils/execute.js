const util = require('node:util');
const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require('discord.js');
const exec = util.promisify(require('node:child_process').exec);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('execute')
		.setDescription('Execute bash code inside the docker container (troubleshooting).')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The command you want to execute.')
				.setRequired(true)),
	async execute(interaction) {
		const input = await interaction.options.getString('input');
		const startup = Date.now();
		try {
			const { stdout } = await exec(input);
			const diff = Date.now() - startup;
			const embed = new EmbedBuilder()
				.setColor('#55ff55')
				.addFields(
					{ name: 'Input', value: codeBlock(input) },
					{ name: 'Output', value: codeBlock(stdout) },
				)
				.setTimestamp()
				.setFooter({ text: `It took ${diff}ms` });
			await interaction.reply({ embeds: [ embed ] });
		}
		catch (error) {
			const diff = Date.now() - startup;
			const embed = new EmbedBuilder()
				.setColor('#ff5555')
				.addFields(
					{ name: 'Input', value: codeBlock(input) },
					{ name: 'Output', value: codeBlock(error) },
				)
				.setTimestamp()
				.setFooter({ text: `It took ${diff}ms` });
			await interaction.reply({ embeds: [ embed ] });
		}
	},
};