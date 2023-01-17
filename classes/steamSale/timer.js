const lista = require('../../controller/SteamSales/listController.js')

function notifier (){
    lista.listNotifier()
    setTimeout(notifier, 5000)
    
    console.log("NOTIFIQUEI")
}
function listUpdate(){
    lista.listUpdate()
    setTimeout(listUpdate, 5000)
    
    console.log("ATUALIZEI A LISTA")
}

module.exports = class notifiers{
    static notifier = notifier
    static listUpdate = listUpdate
}
