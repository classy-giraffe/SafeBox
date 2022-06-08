const messageModel = require('../models/messageSchema');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		try {
			console.log(message.createdAt);
			const messageInfo = await messageModel.create({
				authorUserId: message.author.id,
				authorUserTag: `${message.author.username}#${message.author.discriminator}`,
				guildId: message.guildId,
				channel: message.channelId,
				id: message.id,
				content: message.content,
			});
			await messageInfo.save();
		}
		catch (err) {
			console.error(err);
		}
	},
};