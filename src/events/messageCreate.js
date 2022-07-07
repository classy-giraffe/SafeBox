const userModel = require('../models/userSchema');

module.exports = {
	name: 'messageCreate',
	async execute(member) {
		try {
			const profile = await userModel.create({
				userID:  member.id,
			});
			profile.save();
		}
		catch (err) {
			console.error(err);
		}
	},
};