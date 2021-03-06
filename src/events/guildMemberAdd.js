const userModel = require('../models/userSchema');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		try {
			const profile = await userModel.create({
				userID:  member.id,
			});
			await profile.save();
		}
		catch (err) {
			console.error(err);
		}
	},
};