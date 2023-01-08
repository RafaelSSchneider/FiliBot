const { SlashCommandBuilder, time } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { client } = require("../..");
const ConnectionController = require("../../controller/voice/connectionController");

// const ConnectionController = require("../../controller/voice/connectionController");

module.exports = class Reprodution {
    queue = [];
    playing = false

    player = createAudioPlayer();
    connection = null
    
    // play()
    async play(message, connection){
        //console.log(message);
        
        if(message != undefined && message.hasOwnProperty('options') && message.options.getString('music') != undefined){
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
            //await ytdl.getBasicInfo(this.queue[0].video.url).then(info => info.videoDetails.lengthSeconds * 1000)
            setTimeout(() => {
                this.queue.shift()
                const resource = createAudioResource(this.queue[0].stream);
                this.playing = true;
                this.player.play(resource);
                this.connection.subscribe(this.player);
            },await ytdl.getBasicInfo(this.queue[0].video.url).then(info => info.videoDetails.lengthSeconds * 1000 + 1000))
            
            const resource = createAudioResource(this.queue[0].stream);

            if(this.connection && message != undefined){
                //message.followUp(('tocando agora na radio eldorado: ' + this.queue[0].video.title))
            }



            this.playing = true;
            this.player.play(resource);
            this.connection.subscribe(this.player);
        }
        if(this.queue.length > 1){
            if(this.connection){
                message.reply('Adicionado a fila: ' + this.queue[this.queue.length - 1].video.title)
            }
        }
        console.log("Queue: ")
        console.log(this.queue.map(file => file.video.title))
    };


    // pause()
    pause(){
        this.player.pause()
    }

    // skip()
    skip(message){
        this.stop()
        this.playing = false
        if(this.queue.length > 0){
            this.queue.shift()
            this.play(message)
        }
    }
    
    // stop()
    stop(){
        this.player.stop()
    }
    
}







