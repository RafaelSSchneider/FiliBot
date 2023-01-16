

module.exports = {

    async listEmbed(lista, channel){
        
        var gameName = lista.map((game) => {
            return game.name
        })
        var gamePrice = lista.map((game) => {
            return game.value
        })
        var gameUser = lista.map((game) => {
            return game.users
        })

        const listEmbed = {
            "title": "Lista de desejos",
            "description": "Lista de jogos adicionados",
            "color": 5814783,
            "fields": [{
                "name": "Jogo",
                "value": gameName = gameName.join('\n'),
                "inline": true
            },
            {
                "name": "Preço",
                "value": gamePrice = gamePrice.join('\n'),
                "inline": true
            },
            {
                "name": "Adicionado por",
                "value": gameUser = gameUser.join('\n'),
                "inline": true
            },],
        }
        channel.send({embeds: [listEmbed]});
    }
}