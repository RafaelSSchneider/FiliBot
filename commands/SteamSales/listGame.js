const lista = require('../../controller/SteamSales/listController.js')
const { SlashCommandBuilder } = require("discord.js");
const { listEmbed } = require('../../messages/steamSale/listEmbed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lista')
        .setDescription('Mostra a lista de desejos'),

    async execute(message) {
        const channel = message.client.channels.cache.get(message.channelId)
        
        const listaData = lista.list.map((game) => {
            return {
                name: game.Game,
                value: game.Price.final_formatted,
                users: game.message.user.tag,
            }
        })
        if(listaData.length == 0){
            message.reply({ content: "Não há jogos na lista" })
        }else{
            message.deferReply();
            setTimeout(async () => {
                listEmbed(listaData, channel)
                message.deleteReply();
            }, 2000)
        }
    }
}