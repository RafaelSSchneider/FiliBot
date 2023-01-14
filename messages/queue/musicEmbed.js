// Description: Embed para a musica que esta tocando
const { EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    async musicEmbed(message, music, channel) {
        const icon = message.user.displayAvatarURL({ size: 1024, dynamic: true });


        const musicEmbed = {
            "title": music.video.title,
            "url": music.video.url,
            "description": "> **Autor:** ``" + music.video.author.name + "``\n> **Duração:** " + await ytdl.getBasicInfo(music.video.url).then(info => info.videoDetails.lengthSeconds) + "s",
            "color": 5814783,
            "author": {
                "name": "Tocando Agora:"
            },
            "footer": {
                "text": "Adicionado por: " + message.user.username,
                "icon_url": "" + icon,
            },
            "thumbnail": {
                "url": "" + music.video.thumbnail
            },
        }
        channel.send({ embeds: [musicEmbed] });
    }

}