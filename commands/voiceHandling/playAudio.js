const { SlashCommandBuilder, time } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');

const queue = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Toca pa nois')
        .addStringOption(option => option.setName('music').setDescription('Nome da música').setRequired(true)),

    async execute(message) {

        const player = createAudioPlayer();
        const searchResult = await yts(message.options.getString('music')); 
        const stream = await ytsc(searchResult.videos[0].url, { filter: 'audioonly' });
        var playing = false;
        queue.push({
            video: searchResult.videos[0],
            stream: stream
        });

        const resource = createAudioResource(queue[0].stream);
        const connect = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guildId,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        const connection = getVoiceConnection(message.guildId);

        const playMusic = async () => {
            if(playing === false){
                //message.reply('Tocando a musica: ' + queue[0].video.title);
                player.play(resource);
                connection.subscribe(player);
                playing = true;
            }else if(playing === true){
                let timeout = await ytdl.getBasicInfo(queue[0].video.url).then(info => info.videoDetails.lengthSeconds * 1000);
                function playNext(){
                    queue.shift();
                    player.play(resource);
                    connection.subscribe(player);
                    if(queue.length === 0){
                        playing = false;
                        return;
                    }
                }
                if(queue.length > 0){
                    setTimeout(playNext, timeout);
                }else{
                }

            }
    };

        const connected = connection ? true : false;
        if(connected){
            playMusic();
        }else{
            connect;
            playMusic();
        }

    },
};