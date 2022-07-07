const userModel = require('../models/userSchema');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;
		try {
			const profileData = await userModel.findOne({
				userID:  message.author.id,
			});
			if (!profileData) {
				const profile = await userModel.create({
					userID:  message.author.id,
				});
				profile.save();
			}
		}
		catch (err) {
			console.error(err);
		}
	},
};