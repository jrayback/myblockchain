const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(data, index, previousHash) {
        this.index = index
        this.timestamp = this.timeStamp()
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    timeStamp() {
        return Math.round((new Date()).getTime())
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

module.exports = class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block("Genesis Block", 0, "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(data, proof) {
        if(this.checkProofString(data, proof) === true) {
            let previousIndex = this.getLatestBlock().index
            let index = previousIndex + 1
            let previousHash = this.getLatestBlock().hash   
            this.chain.push(new Block(data, index, previousHash))
        }
    }

    checkProofString(data, proof) {
        let conditionString = this.getConditionString()
        let challenge = JSON.stringify(data)
        let hash = SHA256(challenge + proof).toString()
        // console.log('<-' + proof)
        // console.log('<-' + hash)
        return hash.slice(0, conditionString.length) === conditionString ? true : false
    }

    getConditionString() {
        return '000000'
    }
}
