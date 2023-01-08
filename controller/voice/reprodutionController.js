const Reprodution = require("../../classes/voice/Reprodution")

module.exports = class ReprodutionController {
    static reprodution = null
    
    //criar a instancia 
    static createReprodution(){
        this.reprodution = new Reprodution()
    }
    
    static get reprodution() {
        return this.reprodution
    }
}




// const Connection = require("../../classes/voice/connection")

// module.exports = class ConnectionController {
//     static connection = null
    
//     //criar a instancia 
//     static createConnection(message){
//         if (!this.connection) this.connection = new Connection().connect(message)
//     }
    
//     static get connection() {
//         return this.connection
//     }
// }

