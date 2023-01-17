// const Connection = require("../../classes/voice/Connection")

const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const { VoiceConnectionStatus } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
const QueueController = require("./queueController");
const ConnectionController = require("../../controller/voice/connectionController");



module.exports = class ConnectionController {
    connection = null
    
    //criar a instancia 
    static connect(message){

        const userOnChannel = message.member
        
        if(!userOnChannel.voice.channelId){
            message.reply("Entra no canal cara")

        }else{
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            return connection
        }


    }
    
    // disconnect()
    static disconnect(message) {
        const connection = getVoiceConnection(message.guildId)
        connection.destroy()
        message.reply('Eu saio pq eu quero, não pq vc quer!')
    }

    static get connection() {
        return this.connection
    }

}







