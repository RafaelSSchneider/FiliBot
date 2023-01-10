const { SlashCommandBuilder } = require("discord.js");
const QueueController = require("../../controller/voice/queueController");
const Connection = require("../../controller/voice/connectionController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Toca pa nois')
        .addStringOption(option => option.setName('music').setDescription('Nome da música').setRequired(true)),

    async execute(message) {
        if(!QueueController.queue) QueueController.createQueue();
        QueueController.queue.play(message, Connection.connect(message))
    }
};