const { SlashCommandBuilder } = require("discord.js");
const timer = require("../../classes/steamSale/timer");
const channelController = require("../../controller/SteamSales/channelController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notifier')
        .setDescription('Liga o notificador e a atualização de dados também'),
    
        async execute(message) {
            message.reply("Ligando motores");
            setTimeout(() => {
                message.deleteReply();
            }, 3000);
            if(channelController.channel == undefined){
                message.reply("Não há canal definido, use /setchannel para definir um canal");
            }else{
                timer.notifier();
                timer.listUpdate();
            }
    }
}