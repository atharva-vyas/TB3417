// npx ganache-cli --fork https://mainnet.infura.io/v3/15de6f2570504efabfc9a6b74ad5ee45 --unlock 0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0 --networkId 999
var Web3 = require('web3');
const BN = require('bn.js');
var _eval = require('eval')
const tokenInterface = require('./tokenInterface.json')
const dexInterface = require('./dexInterface.json')
const functions = require("./modules.js")

var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

const dex = 'uniswapV2'
const sender = '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0'
const GAS = 3000000

const AMOUNT_IN = new BN(10).pow(new BN(18)).mul(new BN(1));    // 1 => this amount is in eth, which is divided by 100

// // TOKENS
// DAI
const tokenIn = 'DAI'
let tokenInAddress
let tokenInABI

// WBTC
const tokenOut = 'WBTC'
let tokenOutAddress
let tokenOutABI

// INTERMEDIATE TOKEN
const intermediateToken = 'WETH'
let intermediateTokenAddress
let intermediateTokenABI

let a       // tokenIn
let b       // tokenOut
let c       // intermediateToken
for (i in tokenInterface) {
    // tokenIn
    if (tokenInterface[i].token === tokenIn) {
        tokenInAddress = tokenInterface[i].address
        tokenInABI = tokenInterface[i].abi
        a = tokenInterface[i]
    }

    // tokenOut
    if (tokenInterface[i].token === tokenOut) {
        tokenOutAddress = tokenInterface[i].address
        tokenOutABI = tokenInterface[i].abi
        b = tokenInterface[i]
    }

    // intermediateToken
    if (tokenInterface[i].token === intermediateToken) {
        intermediateTokenAddress = tokenInterface[i].address
        intermediateTokenABI = tokenInterface[i].abi
        c = tokenInterface[i]
    }
}

// // UNISWAP ROUTER INTERFACE
let d
let router
let routerABI
for (i in dexInterface) {
    if (dexInterface[i].dex == dex) {
        d = dexInterface[i].interfaces[1]
        router = dexInterface[i].interfaces[1].address
        routerABI = dexInterface[i].interfaces[1].abi
    }
}

const PATH = [tokenInAddress, intermediateTokenAddress, tokenOutAddress]
const WHALE = sender
const TOKEN_IN = tokenInAddress;
const TOKEN_OUT = tokenOutAddress;

// // CONTRACTS INIT
const contractIn = new web3.eth.Contract(tokenInABI, TOKEN_IN);
const contractRouter = new web3.eth.Contract(routerABI, router);
const contractOut = new web3.eth.Contract(tokenOutABI, TOKEN_OUT);

async function totalSupply(router) {
    const modules = new functions.token();
    let exists = false;
    const totalSupply = a.functions[0].read.totalSupply
    
    if (totalSupply === 'totalSupply') {
        exists = true;
        console.log(await modules.totalSupply(router));
    } 
    
    if (totalSupply === '...') {
        exists = true;
        // ....
    } 

    else if (!exists) {
        console.log('totalSupply => function not supported');
    }
}
// totalSupply(contractIn)

async function checkAllowance(router, sender, recipient) {
    const modules = new functions.token();
    let exists = false;
    const allowance = a.functions[0].read.checkAllowance

    if (allowance === 'allowance') {
        exists = true;
        console.log(await modules.allowance(router, sender, recipient));
    } 
    
    if (allowance === '...') {
        exists = true;
        // ....
    } 

    else if (!exists) {
        console.log('allowance => function not supported');
    }
}
// checkAllowance(contractIn, sender, dexInterface[i].interfaces[1].address)
// checkAllowance(contractIn, sender, router)

async function approve(router, routerAddress, amountIn, sender, gas) {
    const modules = new functions.token();
    let exists = false;
    const approve = a.functions[0].write.approve

    if (approve === 'approve') {
        exists = true;
        console.log(await modules.approve(router, routerAddress, amountIn, sender, gas));
    } 
    
    if (approve === '...') {
        exists = true;
        // ....
    } 

    else if (!exists) {
        console.log('approve => function not supported');
    }
}
// approve(contractIn, router, AMOUNT_IN, sender, GAS)


async function swapExactTokensForTokens(router, amountIn, tolerance, path, sender, recipient, expiration, gas) {
    const modules = new functions.dex();
    let exists = false;
    const exactTokensForTokens = d.functions[0].write.swapExactTokensForTokens
    
    if (exactTokensForTokens === 'swapExactTokensForTokens') {
        exists = true;
        console.log(await modules.swapExactTokensForTokens(router, amountIn, tolerance, path, sender, recipient, expiration, gas));
    } 
    
    if (exactTokensForTokens === '...') {
        exists = true;
        // ....
    } 

    else if (!exists) {
        console.log('swapExactTokensForTokens => function not supported');
    }
}
const tolerance = 90    //percent
const path = [tokenInAddress, intermediateTokenAddress, tokenOutAddress]
const expiration = 30   //seconds
// swapExactTokensForTokens(contractRouter, AMOUNT_IN, tolerance, path, sender, sender, expiration, GAS)
// console.log(contractRouter, AMOUNT_IN, tolerance, path, sender, sender, expiration, GAS);
console.log(path);