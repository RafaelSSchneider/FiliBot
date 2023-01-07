const Connection = require("../../classes/voice/connection")

module.exports = class ConnectionController {
    static connection = null
    
    //criar a instancia 
    static createConnection(message){
        if (!this.connection) this.connection = new Connection().connect(message)
    }
    
    static get connection() {
        return this.connection
    }
}







