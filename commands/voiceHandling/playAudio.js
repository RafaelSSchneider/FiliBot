const { SlashCommandBuilder, time } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');

const ReprodutionController = require("../../controller/voice/reprodutionController");
const Connection = require("../../controller/voice/connectionController");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Toca pa nois')
        .addStringOption(option => option.setName('music').setDescription('Nome da música').setRequired(true)),

    async execute(message) {
        if(!ReprodutionController.reprodution) ReprodutionController.createReprodution();
        ReprodutionController.reprodution.play(message, Connection.connect(message))
    }
};