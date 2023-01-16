const fetch = require('node-fetch');



module.exports = class listController{

    static list = []
    static gamesId = []

    static get list() {
        return this.list
    }
    /**
     * @param {{ appid: string; }} game
     */
    static async listAdd(game, message) {
        
        
        const getData = await fetch('http://store.steampowered.com/api/appdetails/?appids=' + game.appid + "&cc=BRL").then(response => response.json());
        
        
        var price = {}
        if(getData[game.appid].data.price_overview == undefined){
            price = {final_formatted: 'Gratuito'}
        }else{
            price = getData[game.appid].data.price_overview
        }

        const list = {Game : getData[game.appid].data.name, Price: price, message: message}
        this.gamesId.push(game.appid)
        this.list.push(list);

    }

    static async listUpdate() {

        console.log(this.gamesId.length);
        if(this.gamesId.length >= 0){
        for(let i = 0; i < this.gamesId.length; i++){

            const getNewData = await fetch('http://store.steampowered.com/api/appdetails/?appids=' + this.gamesId[i] + "&cc=BRL").then(response => response.json());
            if(getNewData[this.gamesId[i]].data.price_overview.final > this.list[i].Price.final){
                this.list[i].Price.final = getNewData[this.gamesId[i]].data.price_overview.final
            }
        }
        console.log("ATUALIZEI A LISTA")
    }
}
    static listNotifier(){
        const listaData = this.list.map((game) => {
            return {
                name: game.Game,
                value: game.Price,
                users: game.message.user.tag,
            }
        })

        if(this.list.length >= 1){
            listaData[0].value.initial = 15;
            listaData[0].value.final = 10;
            for(let i = 0; i < listaData.length; i++){
                if(listaData[i].value.initial > listaData[i].value.final){
                    console.log('Mudou de preço')
                }
            }
        }
    }

    static remove = (game) => {
        this.list.splice(this.list.indexOf(game), 1);
    }
}