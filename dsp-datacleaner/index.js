// const Postal = require('../libs/postal/chengyun')
// const wait = require('../utils/wait')

class Services {
    constructor() {
        this.run()
    }
    async run() {
        const redis = await require('../libs/connector').ioredis()


    }
}

new Services()
