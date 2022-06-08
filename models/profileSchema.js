const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	userID: { type: String, require: true, unique: true },
	userTag: { type: String, require: true },
	guildID: { type: String, require: true },
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;