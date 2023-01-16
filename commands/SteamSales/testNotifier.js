const { SlashCommandBuilder } = require("discord.js");
const timer = require("../../classes/steamSale/timer");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notifier')
        .setDescription('Teste do notificador e atualizador de lista'),
    
        async execute(message) {
            timer.notifier();
            timer.listUpdate();
    }
}