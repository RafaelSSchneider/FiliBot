const { SlashCommandBuilder} = require("discord.js");
const QueueController = require("../../controller/voice/queueController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('PARA TUDO'),
 
    async execute(message) {
        QueueController.queue.stop()
        message.reply({ content: 'CABOU SAPORRA' })
    }
};