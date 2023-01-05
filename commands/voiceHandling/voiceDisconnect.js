const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('eu saio do canal pq eu quero, não pq vc quer!'),
    

    async execute(message) {
        const connection = getVoiceConnection(message.guildId)
        connection.destroy()
        message.reply('Eu saio pq eu quero, não pq vc quer!')
    },
};
