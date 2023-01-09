const { SlashCommandBuilder, time, Message } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');

const ReprodutionController = require("../../controller/voice/reprodutionController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Pula pula'),
    async execute(message) {
        ReprodutionController.queue.skip(message)
    }
    
};