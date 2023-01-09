const { SlashCommandBuilder} = require("discord.js");
const ReprodutionController = require("../../controller/voice/queueController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Quer saber oq ta tocando?'),
 
    async execute(message) {
        ReprodutionController.queue.queue
        message.reply({ content: 'CABOU SAPORRA' })
    }
};