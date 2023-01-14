const { createAudioPlayer, createAudioResource} = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { musicEmbed } = require('../../messages/queue/musicEmbed');
const { playlistEmbed } = require('../../messages/queue/playlistEmbed');
const {Events } = require('discord.js');

module.exports = class Reprodution {
    queue = [];
    playing = false

    player = createAudioPlayer();
    connection = null

    async play(message, connection) {
        const channel = message.client.channels.cache.get(message.channelId)
        //verifica se a mensagem contém alguma musica, se tiver irá pesquisar ela no youtube e adicionar a queue

        if (message != undefined && message.hasOwnProperty('options') && message.options.getString('music') != undefined) {
            const searchResult = await yts(message.options.getString('music'));
            const stream = await ytdl(searchResult.videos[0].url, { filter: 'audioonly' })


            this.queue.push({
                video: searchResult.videos[0],
                stream: stream
            })
        }

        //cria a conexão com o canal de voz

        if (!this.connection) this.connection = connection;

        //verifica se está tocando alguma musica, se estiver, irá iniciar um timer para a troca de musica (se ouver)
        //e enviará enviar um Embed da musica atual 

        if (!this.playing) {
            if (this.queue.length > 1) {
                setTimeout(() => {
                    this.queue.shift()
                    const resource = createAudioResource(this.queue[0].stream);
                    this.playing = true;
                    this.player.play(resource);
                    this.connection.subscribe(this.player);
                }, await ytdl.getBasicInfo(this.queue[0].video.url).then(info => info.videoDetails.lengthSeconds * 1000 + 1000))
            } else {
                console.log("Não tem mais musicas na queue")
            }



            const resource = createAudioResource(this.queue[0].stream);
            if (this.connection && message != undefined) {
                musicEmbed(message, this.queue[0], channel);
            }

            //inicia a reprodução da musica, setando o playing e sobrescrevendo a conexão
            this.playing = true;
            this.player.play(resource);
            this.connection.subscribe(this.player);
        }

        //verifica se a queue tem mais de uma musica, se tiver, irá enviar uma mensagem de que a musica foi adicionada a queue
        //e irá adicionar um botão para pular a musica
        if (this.queue.length > 1) {
            if (this.connection) {

                const icon = message.user.displayAvatarURL({ size: 1024, dynamic: true });
                playlistEmbed(message, this.queue[this.queue.length - 1], channel, icon);
                message.client.on(Events.InteractionCreate, interaction => {
                    if (!interaction.isButton()) return;
                    if(this.queue.length > 1){
                        this.skip(message);
                    }
                })
            }
        }
        console.log("Queue: ")
        console.log(this.queue.map(file => file.video.title))
    };


    // pause()
    pause() {
        this.player.pause()
    }

    // skip()
    skip(message) {
        if(this.queue.length > 1){
            this.queue.shift()
            this.playing = false
            this.play(message, this.connection)
        }else{
            this.playing = false
            this.stop()
        }
    }

    // stop()
    stop() {
        this.player.stop()
    }

}
