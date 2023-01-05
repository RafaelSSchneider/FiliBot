
const { SlashCommandBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Da oi para o corno'),
    /*
    The data property, which will provide the command definition 
    shown above for registering to Discord.
    The execute method, which will contain the functionality 
    to run from our event handler when the command is used.
    */
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, opa tudo joined on ${interaction.member.joinedAt}.`);
    },
};