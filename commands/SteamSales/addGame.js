const { SlashCommandBuilder } = require("discord.js");
const fetch = require('node-fetch');
const jcc = require('json-case-convertor');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addgame')
        .setDescription('Adiciona um jogo a lista de desejos')
        .addStringOption(option => option.setName('game').setDescription('Nome do jogo')),

    async execute(interaction) {
        var game = interaction.options.getString('game');
        game = game.toString().toLowerCase();
        var search = await fetch('http://api.steampowered.com/ISteamApps/GetAppList/v0002/').then(response => response.json());
        search = jcc.lowerCaseAll(search)
        const result = search.applist.apps.find(app => app.name === game);
        
        if(!result){
            console.log('Jogo não encontrado');
        }else{
            console.log(result.appid);
            interaction.reply('Jogo adicionado a lista de desejos ' + result.name);
        }
        
    }
};