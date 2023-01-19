const { SlashCommandBuilder } = require("discord.js");
const fetch = require('node-fetch');
const jcc = require('json-case-convertor');
const lista = require('../../controller/SteamSales/listController.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addgame')
        .setDescription('Adiciona um jogo a lista de desejos')
        .addStringOption(option => option.setName('game').setDescription('Nome do jogo')),

    async execute(message) {

        var game = message.options.getString('game');
        game = game.toString().toLowerCase();
        var search = await fetch('http://api.steampowered.com/ISteamApps/GetAppList/v0002/').then(response => response.json());
        search = jcc.lowerCaseAll(search)
        const result = search.applist.apps.find(app => app.name === game);
        
        if(!result){
            message.deferReply();
            await setTimeout(() => {
                message.editReply('Jogo não encontrado');
            }, 1000);
        }else{
            message.deferReply();
            await lista.listAdd(result, message)
            setTimeout(() => {
                message.editReply(`Jogo adicionado a lista de desejos: ${result.name} por ${message.user}`);
            }, 1000);
        }

    }
};