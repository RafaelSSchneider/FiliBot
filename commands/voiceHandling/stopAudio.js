const { SlashCommandBuilder} = require("discord.js");
const ReprodutionController = require("../../controller/voice/queueController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('PARA TUDO'),
 
    async execute(message) {
        ReprodutionController.queue.stop()
        message.reply({ content: 'CABOU SAPORRA' })
    }
};