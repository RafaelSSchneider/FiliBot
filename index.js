// Require the necessary discord.js classes
const fs = require('node:fs');
const { Collection } = require('discord.js')
const path = require('node:path');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const dir = ['../commands/testCommands','../commands/voiceHandling'];


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.commands = new Collection();


for(const directiories of dir){
	const commandsPath = path.join(__dirname, `commands/${directiories}`);
	const commandFiles = (fs.readdirSync(`commands/${directiories}`).filter(file => file.endsWith('.js')));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if(!command) return;
	
	try{
		await command.execute(interaction);
	}catch (error){
		console.error(error);
		await interaction.reply({content :'deu erro pra executar ai amigão, ve se foi o usuario', ephemeral: true});
	}
});
// Log in to Discord with your client's token
client.login(token);