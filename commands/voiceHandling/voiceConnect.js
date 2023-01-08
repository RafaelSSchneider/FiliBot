const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const { VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Da oi para os cornos'),
    
    async execute(message){
        const userOnChannel = message.member
        if(!userOnChannel.voice.channelId){
            message.reply("Entra no canal cara")
        }else{
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            message.reply('Entrei juntinho de voce arromabado')
        }
    },
};
