const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
	authorUserId: { type: String, require: true },
	authorUserTag: { type: String, require: true },
	guildId: { type: String, require: true },
	channelId: { type: String, require: true },
	id: { type: String, require: true },
	createdAt: { type: Date, require: true },
	interaction: {
		name: { type: String },
		parameters: { type: String },
	},
});

const model = mongoose.model('interactionLog', interactionSchema);

module.exports = model;