
const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const { VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Da oi para o corno'),
    
    async execute(message){

        console.log(message)
        const userOnChannel = message.member
        if(!userOnChannel.voice){
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
