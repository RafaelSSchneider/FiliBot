const { SlashCommandBuilder, time } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');

const QueueController = require("../../controller/voice/QueueController");
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