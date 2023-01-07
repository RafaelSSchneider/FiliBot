const { SlashCommandBuilder, time } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');

const Reprodution = require("../../controller/voice/reprodution");

//skip ta quebrado

//isso ta quebrado preciso achar um lugar universal para instanciar essa merda
const reproduction = new Reprodution()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Pula pula'),

    async execute() {
        reproduction.skip()
    }
    
};