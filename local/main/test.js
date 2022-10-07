var Web3 = require('web3');

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const privateKey = "0x290dd7a1b1f03e8ef89140020752390909c678bb08d0044bc7a020d7dc71655d"
// const signer = new ethers.Wallet(privateKey, provider)

web3.eth.getBlockNumber().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

const abi = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const smartContract = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

// 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
// 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
// let contract = new web3.eth.Contract(abi, smartContract);
// contract.methods.getPair('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2').call().then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });


// 0x6B3595068778DD592e39A122f4f5a5cF09C90fE2
// 0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9
// Read-Write; By connecting to a Signer, allows:
// - Everything from Read-Only (except as Signer, not anonymous)
// - Sending transactions for non-constant functions

const accounts = web3.eth.accounts.privateKeyToAccount(privateKey);
const contract = new web3.eth.Contract(abi, smartContract);

web3.eth.getAccounts().then(async (result) => {

  contract.methods.createPair('0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9').send({from: result[0], gas:3000000}).then((result0) => {
    console.log(JSON.stringify(result0));
  }).catch((err0) => {
    console.log(err0);
  });
    
})

/* 
{
  "transactionHash": "0x31adea31b9e722f098a363418610ae24433b361707967c2b3f8c5ae396b5086f",
  "transactionIndex": 0,
  "blockHash": "0xd82c08c1d3bb6af0bc93d9fe7a85bff9a3a7b2b443a97bfb01dd4d3bb343045d",
  "blockNumber": 14243901,
  "from": "0x40355fbaecc63775ff038810421363d5066cf959",
  "to": "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f",
  "gasUsed": 2498364,
  "cumulativeGasUsed": 2498364,
  "contractAddress": null,
  "status": true,
  "logsBloom": "0x00000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000010000000000000000000000000000000000800000000000000000000000000000000000000000000000080000100000000000000000000000000000040000000000000000000000000000000000000000000000000080000000000000000000000000000002000000000208000",
  "events": {
    "PairCreated": {
      "logIndex": 0,
      "transactionIndex": 0,
      "transactionHash": "0x31adea31b9e722f098a363418610ae24433b361707967c2b3f8c5ae396b5086f",
      "blockHash": "0xd82c08c1d3bb6af0bc93d9fe7a85bff9a3a7b2b443a97bfb01dd4d3bb343045d",
      "blockNumber": 14243901,
      "address": "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      "type": "mined",
      "removed": false,
      "id": "log_78f822c3",
      "returnValues": {
        "0": "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
        "1": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "2": "0x581c58370131eDd23F36177CD034A6b28FA86441",
        "3": "63737",
        "token0": "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
        "token1": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "pair": "0x581c58370131eDd23F36177CD034A6b28FA86441"
      },
      "event": "PairCreated",
      "signature": "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9",
      "raw": {
        "data": "0x000000000000000000000000581c58370131edd23f36177cd034a6b28fa86441000000000000000000000000000000000000000000000000000000000000f8f9",
        "topics": [
          "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9",
          "0x0000000000000000000000006b3595068778dd592e39a122f4f5a5cf09c90fe2",
          "0x0000000000000000000000007fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
        ]
      }
    }
  }
}
*/
