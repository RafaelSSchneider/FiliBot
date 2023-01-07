const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');
const fs = require('node:fs');

// Read all directories inside the commands and build they path
const dir = (fs.readdirSync('./commands').map((item) => item));

const commands = [];

// Grab all the command files fArom the commands directory you created earlier
for(const directiories of dir){
	const commandFiles = (fs.readdirSync(`./commands/${directiories}`).filter(file => file.endsWith('.js')));

	for (const file of commandFiles) {
		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		console.log(`Carregando comando ${file} do diretorio ${directiories}`)
		const command = require(`../commands/${directiories}/${file}`);
		commands.push(command.data.toJSON());
	}
}
// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Iniciando instalação de ${commands.length} comandos.`);

        //Aqui se define de deseja só usar uma guilda(server) ou todos, para mudar todos só trocar a rota para Routes.applicationCommands(clientId),
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		for(const command of commands){
			console.log(`'Load status': '✔️  -> Command Loaded: '` + command.name);
		}
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
		for(const command of commands){
			console.log(`'Load status': '❌  -> Command Error'` + command.name)
		}
	}
})();