import fs from 'node:fs';
import path from 'path';

module.exports = (client: any) => {
	const eventsPath = path.join(__dirname, '../events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args: any) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args: any) => event.execute(...args));
		}
	}
};