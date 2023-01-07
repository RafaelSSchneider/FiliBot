const Reprodution = require("../../classes/voice/reprodution")

module.exports = class ReprodutionController {
    static reproduction = null
    
    //criar a instancia 
    static createReprodution(){
        console.log("OIIIIIII")

        // this.reproduction = new Reprodution()
    }
    
    static get reproduction() {
        return this.reproduction
    }
}







