const { SlashCommandBuilder } = require("discord.js");
const gameList = require('../../controller/SteamSales/gamesOnSale.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listgames')
        .setDescription('Lista os jogos da lista de desejos'),
    async execute(interaction) {
        await interaction.deferReply();
        setTimeout(async () => {
            interaction.editReply('Lista de jogos:');
            const games = await gameList.getList();
            if(games.length === 0){
                interaction.editReply('Lista vazia');
                return;
            }
            interaction.editReply(games.map(game => `${game.GameName} - ${game.price} - ${game.priceDiscount}`).join('\n'));
        }, 1000);
    }
}