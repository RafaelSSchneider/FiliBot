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




