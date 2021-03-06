const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userID: { type: Number, unique: true, require: true },
	cookies: { type: Number, default: 0 },
	hugs: { type: Number, default: 0 },
	kisses: { type: Number, default: 0 },
	pets: { type: Number, default: 0 },
	slaps: { type: Number, default: 0 },
	spanks: { type: Number, default: 0 },
	matches: { type: Map, of: Number, default: new Map() },
});

const model = mongoose.model('users', userSchema);

module.exports = model;