const { SlashCommandBuilder } = require('@discordjs/builders');
const channelC = require('../../controller/SteamSales/channelController.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('Seta o canal de notificações'),

        async execute(message){
            const channel = message.client.channels.cache.get(message.channelId)
            channelC.channel = channel
            message.reply({ content: `Canal de notificações setado para ${channel.name}` })
        }
}