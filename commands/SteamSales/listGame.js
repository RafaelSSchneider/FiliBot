const lista = require('../../controller/SteamSales/listController.js')
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lista')
        .setDescription('Mostra a lista de desejos'),

    async execute(message) {
        const listaData = await lista.list.map((game) => {
            return {
                name: game.Game,
                value: game.Price.final_formatted,
                user: game.User
            }
        })
        console.log(listaData)
        message.deferReply();
        setTimeout(() => {
            message.editReply({ content: 'Lista de desejos', embeds: [{ fields: listaData }] })
        }, 1000)
    }
}