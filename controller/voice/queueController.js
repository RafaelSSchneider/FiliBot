const Queue = require("../../classes/voice/queue")

module.exports = class QueueController {
    static queue = null
    
    //criar a instancia 
    static createQueue(){
        this.queue = new Queue()
    }
    
    static get queue() {
        return this.queue
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

