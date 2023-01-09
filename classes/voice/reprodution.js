const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const { client } = require("../..");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Clica para pular')
            .setStyle(ButtonStyle.Primary))



module.exports = class Reprodution {
    queue = [];
    playing = false

    player = createAudioPlayer();
    connection = null

    async play(message, connection) {

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

        //verifica se está tocando alguma musica, se estiver, irá iniciar um timer para a troca de musica ((to-do) se ouver)
        //e enviará enviar um Embed da musica atual 

        if (!this.playing) {
            setTimeout(() => {
                this.queue.shift()
                const resource = createAudioResource(this.queue[0].stream);
                this.playing = true;
                this.player.play(resource);
                this.connection.subscribe(this.player);
            }, await ytdl.getBasicInfo(this.queue[0].video.url).then(info => info.videoDetails.lengthSeconds * 1000 + 1000))

            const resource = createAudioResource(this.queue[0].stream);
            if (this.connection && message != undefined) {


                //cria o embed com a musica atual
                const musicEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Tocando agora :musical_note: \n' + this.queue[0].video.title)
                .setURL(this.queue[0].video.url)
                .setDescription("Pedido por: " + message.user.username)
                .setThumbnail(await ytdl.getBasicInfo(this.queue[0].video.url).then(info => info.videoDetails.thumbnails[0].url));


                //pega o channel ID do canal que o comando foi executado
                const channel = message.client.channels.cache.get(message.channelId)
                channel.send({ embeds: [musicEmbed] });

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
                message.reply({ content: 'Adicionado a fila' + this.queue[this.queue.length - 1].video.title, components: [row] })
                message.client.on(Events.InteractionCreate, interaction => {
                    if (!interaction.isButton()) return;
                    interaction.reply('Pulando musica')
                    this.skip(message);
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
        this.stop()
        this.playing = false
        if (this.queue.length > 0) {
            this.queue.shift()
            this.play(message)
        }
    }

    // stop()
    stop() {
        this.player.stop()
    }

}
