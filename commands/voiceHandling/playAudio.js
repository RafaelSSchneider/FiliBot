const { SlashCommandBuilder, ApplicationCommandOptionType } = require("discord.js");
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource} = require('@discordjs/voice');
const { joinVoiceChannel } = require('@discordjs/voice');
const { join } = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Toca pa nois'),
    async execute(message) {
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guildId,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        message.reply('Entrando para tocar pa nois')

        const player = createAudioPlayer();
        const resource = createAudioResource(`C://Users//rafae//Desktop/FiliBot/Fili-Bot//commands/voiceHandling//music.mp3`);
        player.play(resource);
        connection.subscribe(player);

    },
};