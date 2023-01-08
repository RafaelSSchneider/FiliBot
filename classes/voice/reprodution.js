const { SlashCommandBuilder, time } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { client } = require("../..");

// const ConnectionController = require("../../controller/voice/connectionController");

module.exports = class Reprodution {
    queue = [];
    playing = false

    player = createAudioPlayer();
    connection = null
    
    // play()
    async play(message, connection){
        if(message){
            const searchResult = await yts(message.options.getString('music')); 
            const stream = await ytdl(searchResult.videos[0].url, { filter: 'audioonly' })
    
            // channel = client.channels.cache.get(message.channelId)

            this.queue.push({
                video: searchResult.videos[0],
                stream: stream
            })
        }

        if(!this.connection) this.connection = connection;

        if(!this.playing){
            const resource = createAudioResource(this.queue[0].stream);
    
            // channel.send('Tocando a musica: ' + this.queue[0].video.title);
            
            this.playing = true;
            this.player.play(resource);
            this.connection.subscribe(this.player);
        }

        console.log("Queue: ")
        console.log(this.queue.map(file => file.video.title))
    };


    // pause()
    pause(){
        this.player.pause()
    }

    // skip()
    skip(){
        this.stop()
        this.playing = false
        this.queue.shift()
        this.play()
    }
    
    // stop()
    stop(){
        this.player.stop()
    }
    
}







