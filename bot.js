const tmi = require('tmi.js');

require("dotenv").config();

const {
	USERNAME,
	OAUTH_TOKEN,
	CHANNEL_NAME
} = process.env;

const opts = {
	options: {
		debug: true
	},
	identity: {
		username: USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [CHANNEL_NAME]
};

const client = new tmi.Client(opts);

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if (self) return;

	if (message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}
});


client.on('message', rockPaperScissors);

function rockPaperScissors(target, self, msg) {

	const computerChoice = Math.floor(Math.random() * 3) + 1

	const commandName = msg.trim();

	//1 = ROCK, 2 = PAPER, 3 = SCISSORS
	if (commandName.toLowerCase() === '!rock') {
		console.log(computerChoice)
		if (computerChoice === 1) {
			client.say(target, `It's a tie! We both chose Rock!`)
		} else if (computerChoice === 2) {
			client.say(target, `I win! You chose Rock and I chose Paper. Try again! `)
		} else client.say(target, `You win! You chose Rock and I chose Scissors. I bet you won't win again!`)
	} else if (commandName.toLowerCase() === '!paper') {
		if (computerChoice === 1) {
			client.say(target, `You win! You chose Paper and I chose Rock. I bet you won't win again!`)
		} else if (computerChoice === 2) {
			client.say(target, `It's a tie! We both chose Paper!`)
		} else client.say(target, `I win! You chose Paper and I chose Scissors. Try again! `)
	} else if (commandName.toLowerCase() === '!scissors') {
		if (computerChoice === 1) {
			client.say(target, `I win! You chose Scissors and I chose Rock. Try again! `)
		} else if (computerChoice === 2) {
			client.say(target, `You win! You chose Scissors and I chose Paper. I bet you won't win again!`)
		} else client.say(target, `It's a tie! We both chose Scissors!`)
	}
}

