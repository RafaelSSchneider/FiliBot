const fetch = require('node-fetch');

module.exports = class listController{

    static list = []

    static get list() {
        return this.list
    }

    /**
     * @param {{ appid: string; }} game
     */
    static async listAdd(game, message) {
        const getData = await fetch('http://store.steampowered.com/api/appdetails/?appids=' + game.appid + "&cc=BRL").then(response => response.json());
    
        const list = {Game : getData[game.appid].data.name, Price: getData[game.appid].data.price_overview, User: message}
        this.list.push(list);
        console.log(this.list)
    }

    static remove = (game) => {
        this.list.splice(this.list.indexOf(game), 1);
    }
}