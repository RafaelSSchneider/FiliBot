const fs = require("fs").promises; // Importar a versão assíncrona do módulo fs
const fetch = require("node-fetch");
const JSONFile = "./controller/SteamSales/steamSalesList.json";

module.exports = class SteamSales {
  static async getList() {
    try {
      // Lê o conteúdo do arquivo de forma assíncrona
      const data = await fs.readFile(JSONFile, 'utf8');
      // Analisa o conteúdo como JSON
      if(data.length === 0) return 0;
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      console.error('Erro ao ler ou analisar o JSON:', error);
    }
  }

  static async addGame(game, interaction) {
    try {

      // Obtém os dados do jogo
      const gameData = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${game.appid}&cc=BRL`
      ).then((response) => response.json());

      // Formatando o preço
      let price = 'Gratuito';
      if (gameData[game.appid].data.price_overview) {
        const initialPrice = gameData[game.appid].data.price_overview.initial;
        price = 'BRL:' + (initialPrice / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
      
      let fileToWrite = {};

      if(gameData[game.appid].data.is_free){
        fileToWrite = {
          game: game.appid,
          GameName: gameData[game.appid].data.name,
          price: 'Gratuito',
          priceDiscount: '',
          Username_interested: {
            Username: interaction.user.username,
          },
        };
      }else{
        fileToWrite = {
          game: game.appid,
          GameName: gameData[game.appid].data.name,
          price: price,
          priceDiscount: gameData[game.appid].data.price_overview.final_formatted,
          Username_interested: {
            Username: interaction.user.username,
          },
        };
      }

      // Lê e atualiza a lista
      let jsonData = await this.getList();
      
      // Verifica se o jogo já está na lista
      if(jsonData.length > 0){
        if(jsonData.find((item) => item.game === fileToWrite.game)){
          await interaction.editReply(`Jogo já está na lista de desejos: ${fileToWrite.GameName} por ${interaction.user}`);
          return;
        }
        jsonData.push(fileToWrite);
      }else{
        jsonData = [];
        jsonData.push(fileToWrite);
      }

      // Escreve a lista de volta no arquivo
      await fs.writeFile(JSONFile, JSON.stringify(jsonData));

    } catch (error) {
      console.error('Erro ao adicionar o jogo:', error);
    }
  }

  static async removeGame(game) {
    try {
      // Lê a lista atual
      const jsonData = await this.getList();

      // Filtra o jogo a ser removido
      const updatedList = jsonData.filter((item) => item.game !== game);

      // Escreve a lista atualizada de volta no arquivo
      await fs.writeFile(JSONFile, JSON.stringify(updatedList));
      console.log("Jogo removido com sucesso.\n");

    } catch (error) {
      console.error('Erro ao remover o jogo:', error);
    }
  }

  static async listGames() {
    try {
      // Obtém a lista atual
      const jsonData = await this.getList();
      return jsonData;

    } catch (error) {
      console.error('Erro ao listar os jogos:', error);
    }
  }
};
