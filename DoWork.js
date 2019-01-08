const RandomWords = require('random-words')
const SHA256 = require('crypto-js/sha256')

function goodWork (data, conditionString) {
    let challenge = JSON.stringify(data)
    let proof = ''
    let hash = 'abcde'
    // keep iterating until we find a proof string that matches the requirement
    while(hash.slice(0,conditionString.length) !== conditionString) {
        proof = getAString()
        hash = SHA256(challenge + proof).toString()
        // console.log(hash)
    }
    // console.log('->' + proof)
    // console.log('->' + hash)
    return proof
}

// this most likely will produce a bogus proof
function bogusWork () {
    return 'BAD STRING'
}

// creates a concatenated string of random English words
function getAString() {
    let string = ''
    for(let i = 0; i < 9; i++) {
        string += RandomWords()
    }
    return string
}

module.exports.goodWork = goodWork
module.exports.bogusWork = bogusWork
