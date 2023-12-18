

module.exports = class SClient {

    static client = null
    static setClient(client) {
        this.client = client
    }
    static getClient() {
        return this.client
    }
}