const Connection = require("../../classes/voice/Connection")

module.exports = class ConnectionController {
    connection = null
    
    //criar a instancia 
    static createConnection(message){
        console.log("oiiiii")
        // if (!this.connection) 
        this.connection = new Connection().connect(message)

    }
    
    static get connection() {
        return this.connection
    }
}







