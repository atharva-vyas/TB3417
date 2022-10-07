var Web3 = require('web3');

// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const privateKey = "0x290dd7a1b1f03e8ef89140020752390909c678bb08d0044bc7a020d7dc71655d"
// const signer = new ethers.Wallet(privateKey, provider)

// web3.eth.getBlock('latest').then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

const DAI_WHALE = '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0'

function mainEnter() {
	web3.eth.getAccounts().then((accounts) => {
		web3.eth.sendTransaction(
			{
				from:DAI_WHALE,
				to:accounts[0],
				value:  "10000000", 
				data: "0xdf"
			}, function(err, transactionHash) {
			if (!err)
			console.log(transactionHash + " success");
		})
	})
}
mainEnter()