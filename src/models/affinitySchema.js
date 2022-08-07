const mongoose = require('mongoose');

const affinitySchema = new mongoose.Schema({
	affinity : { type: Map, of: Number, default: new Map() },
});

const model = mongoose.model('affinity', affinitySchema);
module.exports = model;