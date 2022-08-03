const userModel = require('../models/userSchema');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;
		try {
			let profile = await userModel.findOne({
				userID:  message.author.id,
			});
			if (!profile) {
				profile = await userModel.create({
					userID:  message.author.id,
				});
				await profile.save();
			}
		}
		catch (err) {
			console.error(err);
		}
	},
};