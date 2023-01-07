const Reprodution = require("../../classes/voice/Reprodution")

module.exports = class ReprodutionController {
    static reproduction = "null"
    
    //criar a instancia 
    static createReprodution(teste){
        console.log("OIIIIIII")
        console.log(teste)
        

        // this.reproduction = new Reprodution()
    }
    
    static get reproduction() {
        return this.reproduction
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

