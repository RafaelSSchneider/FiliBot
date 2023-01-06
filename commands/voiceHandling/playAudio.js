const { SlashCommandBuilder, ApplicationCommandOptionType } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');
const {createAudioPlayer} = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const { join } = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Toca pa nois'),
    async execute(message) {

        const connection = getVoiceConnection(message.guildId)
        if(!connection){
            message.reply("Eu não estou conectado a nenhum canal de voz, use o comando /join para me conectar")
        }else{
                const player = createAudioPlayer();
                
                const resource = createAudioResource('music.mp3');

                player.play(resource);
                connection.subscribe(player);
                message.reply('Tocando' + resource)
        }
    },
};