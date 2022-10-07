// npx ganache-cli --fork https://mainnet.infura.io/v3/15de6f2570504efabfc9a6b74ad5ee45 --unlock 0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0 --networkId 999
var Web3 = require('web3');
const BN = require('bn.js');
var _eval = require('eval')
const tokenInterface = require('./tokenInterface.json')
const dexInterface = require('./dexInterface.json')
const functions = require("./modules.js")
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const privateKey = "0x290dd7a1b1f03e8ef89140020752390909c678bb08d0044bc7a020d7dc71655d"
const accounts = web3.eth.accounts.privateKeyToAccount(privateKey);
const dex = 'uniswapV2'
const sender = '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0'
const GAS = 3000000
const AMOUNT_IN = new BN(10).pow(new BN(18)).mul(new BN(1));    // 1 => this amount is in eth, which is divided by 100
const tokenIn = 'DAI'
let tokenInAddress
let tokenInABI
const tokenOut = 'WBTC'
let tokenOutAddress
let tokenOutABI
const intermediateToken = 'WETH'
let intermediateTokenAddress
let intermediateTokenABI
let a       // tokenIn
let b       // tokenOut
let c       // intermediateToken
for (i in tokenInterface) {
    if (tokenInterface[i].token === tokenIn) {
        tokenInAddress = tokenInterface[i].address
        tokenInABI = tokenInterface[i].abi
        a = tokenInterface[i]
    }
    if (tokenInterface[i].token === tokenOut) {
        tokenOutAddress = tokenInterface[i].address
        tokenOutABI = tokenInterface[i].abi
        b = tokenInterface[i]
    }
    if (tokenInterface[i].token === intermediateToken) {
        intermediateTokenAddress = tokenInterface[i].address
        intermediateTokenABI = tokenInterface[i].abi
        c = tokenInterface[i]
    }
}
let router
let routerABI
for (i in dexInterface) {
    if (dexInterface[i].dex == dex) {
        router = dexInterface[i].interfaces[1].address
        routerABI = dexInterface[i].interfaces[1].abi
    }
}
const PATH = [tokenInAddress, intermediateTokenAddress, tokenOutAddress]
const WHALE = sender
const TOKEN_IN = tokenInAddress;
const TOKEN_OUT = tokenOutAddress;
const contractIn = new web3.eth.Contract(tokenInABI, TOKEN_IN);
const contractRouter = new web3.eth.Contract(routerABI, router);
const contractOut = new web3.eth.Contract(tokenOutABI, TOKEN_OUT);


let done = true
const isItDoneYet = new Promise(async (resolve, reject) => {
    if (done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        resolve('workDone')
    } else {
        reject('why')
    }
})

const checkIfItsDone = () => {
    isItDoneYet.then((res) => {
        console.log(res);
    })

}
// checkIfItsDone()

function name() {
    return new Promise(async (resolve, reject) => {
        contractIn.methods.totalSupply().call().then(async (res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

name().then((result) => {
    console.log(result);
})
