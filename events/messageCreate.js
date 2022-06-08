const messageModel = require('../models/messageSchema');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		try {
			const messageInfo = await messageModel.create({
				authorUserId: message.author.id,
				authorUserTag: `${message.author.username}#${message.author.discriminator}`,
				guildId: message.guildId,
				channelId: message.channelId,
				id: message.id,
				createdAt: message.createdAt,
				content: message.content,
			});
			await messageInfo.save();
		}
		catch (err) {
			console.error(err);
		}
	},
};