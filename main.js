const Blockchain = require('./Blockchain')
const DoWork = require('./DoWork')

let jmrCoin = new Blockchain()

// temp variables for testing
let temp = 0
let proofs = []

for(let i = 0; i < 3; i++) {
    let data = {}
    let amount = Math.floor(Math.random() * 101)
    data.amount = amount
    let proof = ''
    // test both good work and bad work
    // dot it randomly based on whether amount is even/odd
    // if(amount % 2 !== 0) {
        temp++
        proof = DoWork.goodWork(data, jmrCoin.getConditionString())
        proofs.push(proof)
    // } else {
    //    proof = DoWork.bogusWork()
    // }
    jmrCoin.addBlock(data, proof)
}

console.log(`
I FOUND ${temp} BLOCK(S) TO ADD...
HERE ARE THE VALID PROOFS:
${proofs}
`)

console.log(JSON.stringify(jmrCoin, null, 4))
