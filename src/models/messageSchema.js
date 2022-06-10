const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	authorUserId: { type: String, require: true },
	authorUserTag: { type: String, require: true },
	guildId: { type: String, require: true },
	channelId: { type: String, require: true },
	id: { type: String, require: true },
	createdAt: { type: Date, require: true },
	content: { type: String, require: true },
});

const model = mongoose.model('messageLog', messageSchema);

module.exports = model;