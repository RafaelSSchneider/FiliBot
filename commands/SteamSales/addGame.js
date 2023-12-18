const { SlashCommandBuilder } = require("discord.js");
const jcc = require('json-case-convertor');
const fetch = require('node-fetch');
const gameList = require('../../controller/SteamSales/gamesOnSale.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('addgame')
        .setDescription('Adiciona um jogo a lista de desejos')
        .addStringOption(option => option.setName('game').setDescription('Nome do jogo')),
    async execute(interaction) {

        //getting the name of the game from the message of the user
        var gameName = interaction.options.getString('game');
        gameName = gameName.toString().toLowerCase();
        var search = await fetch('http://api.steampowered.com/ISteamApps/GetAppList/v0002/').then(response => response.json());
        search = jcc.lowerCaseAll(search)
        const result = search.applist.apps.find(app => app.name === gameName);

        if(!result){
            await interaction.deferReply();
            await setTimeout(() => {
                interaction.editReply('Jogo não encontrado');
            }, 1000);
        }else{
            await interaction.deferReply();
            //add the game
            setTimeout(() => {
                gameList.addGame(result, interaction);
                interaction.editReply(`Jogo adicionado a lista de desejos: ${result.name} por ${interaction.user}`);
            }, 1000);
        }
    }
} 