const tmi = require('tmi.js');

require("dotenv").config();

const { USERNAME, OAUTH_TOKEN, CHANNEL_NAME} = process.env;

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}
});