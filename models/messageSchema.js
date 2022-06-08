const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	authorUserId: { type: String, require: true },
	authorUserTag: { type: String, require: true },
	guildId: { type: String, require: true },
	channel: { type: String, require: true },
	id: { type: String, require: true },
	content: { type: String, require: true },
});

const model = mongoose.model('messageModel', messageSchema);

module.exports = model;