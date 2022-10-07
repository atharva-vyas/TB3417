const BN = require('bn.js');

const A = 1           // amount of token A in uniswap
const B = 1           // amount of token B in uniswap
const f = 3 / 1000    // trading fee (%0.003)
const a = 1           // amount of token A that i have
const b = 1           // amount of token B that i need
const s = 1           // amount of token to swap from A to B


// const s11 = (-1*(2-f)*A) * 1000
const s11 = parseInt((new BN(-1*(2-f)*1000).mul(new BN(A))).toString())
// const s12 = (((2-f) * A)**2) * 1000000
const s12 = parseInt(((new BN((2-f)*1000).mul(new BN(A))).mul(new BN((2-f)*1000).mul(new BN(A)))).toString())
// const s13 = (4 * (1 - f) *A*a) * 1000000
const s13 = parseInt(((new BN(4*(1 - f)*1000).mul(new BN(A)).mul(new BN(a))).mul(new BN(1000))).toString())
const s14 = (2 * (1-f)) * 1000

const swap = new BN(new BN(s11).add(new BN(((new BN(s12).add(new BN(s13))).toString()) ** 0.5))) / s14
console.log(swap);

let swapString = '1'
let gotDecimal = false;
for (let i = 0; i < swap.toString().length; i++) {
    const element = swap.toString()[i];

    if (!gotDecimal) {
        if (element === '.') {
            gotDecimal = true;
        }
    } else {
        swapString += '0'
    }
}

// const swap0 = swap * parseInt(swapString)
// console.log(swap0);
// console.log('');

const b01 = B * (1-f) * swap
const b02 = A + (1-f) * swap
// const b00 = b01 / b02
const b00 = b01 / b02

const b1 = (new BN(B) * new BN((1-f)*100) * new BN(swap0)).toString()
const b2 = (new BN(A) + new BN((1-f)*100) * new BN(swap0)).toString()

console.log(b00);
console.log(b01, b02);
console.log(b1, b2);
// console.log(swapString);
// console.log(new BN(b1) / new BN(b2));