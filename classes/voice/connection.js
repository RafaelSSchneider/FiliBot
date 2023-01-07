const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const { VoiceConnectionStatus } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
// const { reproduction } = require("../../controller/voice/reprodutionController");
const ReprodutionController = require("../../controller/voice/reprodutionController");
const ConnectionController = require("../../controller/voice/connectionController");


module.exports = class Connection {

    // connect()
    connect(message){
        const userOnChannel = message.member
        
        if(!userOnChannel.voice.channelId){
            message.reply("Entra no canal cara")

        }else{
            if(getVoiceConnection(message.guildId))
                return message.reply('Ja to numa call')
                
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            console.log("oi")
            // console.log(reproduction)
            // console.log(ConnectionController.connection)
            // console.log(ReprodutionController.reproduction)
            
            // ReprodutionController.createReprodution("Teste");

            message.reply('Entrei juntinho de voce arrombado')
            return connection;
        }
    }   

    // disconnect()
    disconnect(message) {
        const connection = getVoiceConnection(message.guildId)
        connection.destroy()
        message.reply('Eu saio pq eu quero, não pq vc quer!')
    }
}
