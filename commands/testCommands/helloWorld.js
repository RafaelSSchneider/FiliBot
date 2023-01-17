
const { SlashCommandBuilder } = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Da oi para o corno'),
    /*
    The data property, which will provide the command definition 
    shown above for registering to Discord.
    The execute method, which will contain the functionality 
    to run from our event handler when the command is used.
    */
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild    

        const response = await fetch('http://store.steampowered.com/api/appdetails/?appids=1245620')
            .then(response => response.json())
        console.log(response[1245620].data.price_overview.final_formatted);
        interaction.reply('Salve familia, o ' + response[1245620].data.name + ' ta custando ' + response[1245620].data.price_overview.final_formatted + ' no steam')
    },
};