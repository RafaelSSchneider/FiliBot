//embed para a playlist toda (queue);
const ytdl = require('ytdl-core');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const ReprodutionController = require("../../controller/voice/reprodutionController");

const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Clica para pular')
            .setStyle(ButtonStyle.Primary))



module.exports = {
    async playlistEmbed(message, queue, channel, icon) {

        const playlistEmbed = {
            "title": queue.video.title,
            "url": queue.video.url,
            "description": "> **Autor:** ``" + queue.video.author.name + "``\n> **Duração:** " + await ytdl.getBasicInfo(queue.video.url).then(info => info.videoDetails.lengthSeconds) + "s",
            "color": 5814783,
            "author": {
                "name": "Adicionado a playlist:"
            },
            "footer": {
                "text": "Adicionado por: " + message.user.username,
                "icon_url": "" + icon,
            },
            "thumbnail": {
                "url": "" + queue.video.thumbnail
            },
        }
        
        channel.send({embeds: [playlistEmbed], components: [row]});

    }
}