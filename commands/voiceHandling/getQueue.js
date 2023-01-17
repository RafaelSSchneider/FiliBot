const { SlashCommandBuilder} = require("discord.js");
const QueueController = require("../../controller/voice/queueController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Quer saber oq ta tocando?'),
 
    async execute(message) {
        message.reply({ content: QueueController.queue.toString() })
    }
};