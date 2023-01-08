const { SlashCommandBuilder, time } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');

// const ConnectionController = require("../../controller/voice/connectionController");

module.exports = class Reprodution {
    queue = [];
    playing = false

    connection = null
    
    // play()
    async play(message, connection){
        if(message){
            const searchResult = await yts(message.options.getString('music')); 
            const stream = await ytdl(searchResult.videos[0].url, { filter: 'audioonly' })
    
            this.queue.push({
                video: searchResult.videos[0],
                stream: stream
            })
        }

        if(!this.connection) this.connection = connection;

        // this.connection = new ConnectionController().createConnection(message);
        
        // if(!connection) this.connection = new Connection().connect(message);

        if(!this.playing){
            const resource = createAudioResource(this.queue[0].stream);
    
            //message.reply('Tocando a musica: ' + searchResult.title);
            this.playing = true;
            this.player.play(resource);
            this.connection.subscribe(this.player);

        }else{
            this.skip();
        }

        console.log("Queue: ")
        console.log(this.queue.map(file => file.video.title))
    };


    // pause()


    // skip()
    skip(){
        this.stop();
        this.playing = false;
        if(this.queue.length === 0) {
        console.log("queue vazia");
        return;
        }
        this.queue.shift();
        this.play();
    }
    
    // stop()
    stop(){
        this.player.stop()
    }
    
}







