var Web3 = require('web3');
const axios = require('axios');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;

const apiKey = "Q4EXMFN911K77IKA1KX4SHRB958A7FY8SV"
const address = "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359"
axios.get('https://api.etherscan.io/api?module=contract&action=getabi&address=' + address + '&apikey=' + apiKey).then((result) => {
    const data = result.data
    console.log(data.result);
})