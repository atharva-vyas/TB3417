const request = require('request');
var Web3 = require('web3');
const BN = require('bn.js');

var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
// var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/15de6f2570504efabfc9a6b74ad5ee45'));
const privateKey = "0x290dd7a1b1f03e8ef89140020752390909c678bb08d0044bc7a020d7dc71655d"
const accounts = web3.eth.accounts.privateKeyToAccount(privateKey);

const WHALE = '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0'
GAS = 3000000

const weth = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const wethABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]
const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const usdcABI = [{"constant":false,"inputs":[{"name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newImplementation","type":"address"},{"name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"implementation","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_implementation","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"previousAdmin","type":"address"},{"indexed":false,"name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"}]

const pool = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8"
const poolABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint128","name":"amount0","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"amount1","type":"uint128"}],"name":"CollectProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"paid1","type":"uint256"}],"name":"Flash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextOld","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"observationCardinalityNextNew","type":"uint16"}],"name":"IncreaseObservationCardinalityNext","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Initialize","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":true,"internalType":"int24","name":"tickUpper","type":"int24"},{"indexed":false,"internalType":"uint128","name":"amount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"feeProtocol0Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1Old","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol0New","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"feeProtocol1New","type":"uint8"}],"name":"SetFeeProtocol","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"int256","name":"amount0","type":"int256"},{"indexed":false,"internalType":"int256","name":"amount1","type":"int256"},{"indexed":false,"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"int24","name":"tick","type":"int24"}],"name":"Swap","type":"event"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collect","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Requested","type":"uint128"},{"internalType":"uint128","name":"amount1Requested","type":"uint128"}],"name":"collectProtocol","outputs":[{"internalType":"uint128","name":"amount0","type":"uint128"},{"internalType":"uint128","name":"amount1","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint24","name":"","type":"uint24"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal0X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeGrowthGlobal1X128","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"}],"name":"increaseObservationCardinalityNext","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"liquidity","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLiquidityPerTick","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"mint","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"observations","outputs":[{"internalType":"uint32","name":"blockTimestamp","type":"uint32"},{"internalType":"int56","name":"tickCumulative","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityCumulativeX128","type":"uint160"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32[]","name":"secondsAgos","type":"uint32[]"}],"name":"observe","outputs":[{"internalType":"int56[]","name":"tickCumulatives","type":"int56[]"},{"internalType":"uint160[]","name":"secondsPerLiquidityCumulativeX128s","type":"uint160[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"positions","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolFees","outputs":[{"internalType":"uint128","name":"token0","type":"uint128"},{"internalType":"uint128","name":"token1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"feeProtocol0","type":"uint8"},{"internalType":"uint8","name":"feeProtocol1","type":"uint8"}],"name":"setFeeProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"},{"internalType":"int24","name":"tick","type":"int24"},{"internalType":"uint16","name":"observationIndex","type":"uint16"},{"internalType":"uint16","name":"observationCardinality","type":"uint16"},{"internalType":"uint16","name":"observationCardinalityNext","type":"uint16"},{"internalType":"uint8","name":"feeProtocol","type":"uint8"},{"internalType":"bool","name":"unlocked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"snapshotCumulativesInside","outputs":[{"internalType":"int56","name":"tickCumulativeInside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityInsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsInside","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bool","name":"zeroForOne","type":"bool"},{"internalType":"int256","name":"amountSpecified","type":"int256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[{"internalType":"int256","name":"amount0","type":"int256"},{"internalType":"int256","name":"amount1","type":"int256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int16","name":"","type":"int16"}],"name":"tickBitmap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int24","name":"","type":"int24"}],"name":"ticks","outputs":[{"internalType":"uint128","name":"liquidityGross","type":"uint128"},{"internalType":"int128","name":"liquidityNet","type":"int128"},{"internalType":"uint256","name":"feeGrowthOutside0X128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthOutside1X128","type":"uint256"},{"internalType":"int56","name":"tickCumulativeOutside","type":"int56"},{"internalType":"uint160","name":"secondsPerLiquidityOutsideX128","type":"uint160"},{"internalType":"uint32","name":"secondsOutside","type":"uint32"},{"internalType":"bool","name":"initialized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const router = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"
const routerABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"},{"internalType":"address","name":"_tokenDescriptor_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"DecreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"liquidity","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"IncreaseLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManager.CollectParams","name":"params","type":"tuple"}],"name":"collect","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint160","name":"sqrtPriceX96","type":"uint160"}],"name":"createAndInitializePoolIfNecessary","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.DecreaseLiquidityParams","name":"params","type":"tuple"}],"name":"decreaseLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManager.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"positions","outputs":[{"internalType":"uint96","name":"nonce","type":"uint96"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"feeGrowthInside0LastX128","type":"uint256"},{"internalType":"uint256","name":"feeGrowthInside1LastX128","type":"uint256"},{"internalType":"uint128","name":"tokensOwed0","type":"uint128"},{"internalType":"uint128","name":"tokensOwed1","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Owed","type":"uint256"},{"internalType":"uint256","name":"amount1Owed","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"uniswapV3MintCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const contractRouter = new web3.eth.Contract(routerABI, router)

const factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
const factoryABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint24","name":"fee","type":"uint24"},{"indexed":true,"internalType":"int24","name":"tickSpacing","type":"int24"}],"name":"FeeAmountEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":true,"internalType":"uint24","name":"fee","type":"uint24"},{"indexed":false,"internalType":"int24","name":"tickSpacing","type":"int24"},{"indexed":false,"internalType":"address","name":"pool","type":"address"}],"name":"PoolCreated","type":"event"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"}],"name":"createPool","outputs":[{"internalType":"address","name":"pool","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickSpacing","type":"int24"}],"name":"enableFeeAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint24","name":"","type":"uint24"}],"name":"feeAmountTickSpacing","outputs":[{"internalType":"int24","name":"","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint24","name":"","type":"uint24"}],"name":"getPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"parameters","outputs":[{"internalType":"address","name":"factory","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickSpacing","type":"int24"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contractFactory = new web3.eth.Contract(factoryABI, factory)

const token0 = usdc
const token0ABI = usdcABI
const token1 = weth
const token1ABI = wethABI

function price(param) {
    let contractPool
    try {
        contractPool  = new web3.eth.Contract(param[2], param[1])
    } catch {
        contractPool = new web3.eth.Contract(param[0], param[1])
    }

    return new Promise((resolve, reject) => {
        contractPool.methods.token0().call().then((poolToken0) => {
            contractPool.methods.token1().call().then((poolToken1) => {
                contractPool.methods.slot0().call().then((result) => {
                    const zero = new BN(result.sqrtPriceX96).pow(new BN("2"))
                    const one = (new BN("2").pow(new BN("192")))
            
                    if (zero.toString().length > one.toString().length) {
                        const zeroOne = (new BN(one.mul(new BN('100000000000000'))).div(zero)).toString()
                        const oneZero = (parseFloat(new BN(zero).div(one).toString()) / 10000000000).toFixed(9)

                        const mathJson = {
                            OneToken0EqualsTo_Token1: oneZero,
                            OneToken1EqualsTo_Token0: zeroOne
                        }
                        resolve(mathJson)
                    }
                    
                    else if (zero.toString().length < one.toString().length) {
                        const zeroOne = (new BN(zero.mul(new BN('100000000000000'))).div(one)).toString()
                        const oneZero = (parseFloat(new BN(one).div(zero).toString()) / 10000000000).toFixed(9)

                        const mathJson = {
                            OneToken0EqualsTo_Token1: oneZero,
                            OneToken1EqualsTo_Token0: zeroOne
                        }
                        resolve(mathJson)
                    }
                })
            })
        })
    })
}
// price([poolABI, pool]).then((result) => {
//     console.log(result);
// })


function getAmountOut(mainJson) {
    return new Promise((resolve, reject) => {  

        function depositAmount(price, tokenAmount, price_high, price_low) {
            let L = (tokenAmount * Math.sqrt(price) * Math.sqrt(price_high))  / (Math.sqrt(price_high) - Math.sqrt(price))
            let y = L * (Math.sqrt(price) - Math.sqrt(price_low))
        
            const deposit = Math.round(y * 100) / 100
            if (parseInt(deposit) == 0 || parseInt(deposit) == -0) {
                return Math.round(y * 100000000) / 100000000
            } else {
                return deposit
            }    
        }

        if (mainJson.depositAmount1) {
    
            const inputJson = [{
                tokenIn: mainJson.tokenPair0, 
                amount: parseFloat(mainJson.depositAmount1)}, 
            pool, poolABI]
            price(inputJson).then((result) => {
                const price = Math.round((parseFloat(result.OneToken1EqualsTo_Token0) / 100) * 1000000000) / 1000000000
                // console.log(price);
                
                let maxPrice
                if (mainJson.maxPrice[mainJson.maxPrice.length - 1] == "%") {
                    maxPrice =  Math.round((price + ((parseFloat(mainJson.maxPrice.slice(0, -1)) / 100) * price)) * 100000000) / 100000000;
                } else {
                    maxPrice =  mainJson.maxPrice;
                }
                
                let minPrice
                if (mainJson.minPrice[mainJson.minPrice.length - 1] == "%") {
                    minPrice =  Math.round((price - ((parseFloat(mainJson.minPrice.slice(0, -1)) / 100) * price)) * 100000000) / 100000000;
                } else {
                    minPrice =  mainJson.minPrice;
                }
                
                const jsonDeposit = {
                    depositAmount0: depositAmount(price, parseFloat(inputJson[0].amount), maxPrice, minPrice),
                    maxPrice: maxPrice,
                    minPrice: minPrice
                }
                resolve(jsonDeposit)
            })
    
        }
    
        else if (mainJson.depositAmount0) {

            const inputJson = [{
                tokenIn: mainJson.tokenPair1, 
                amount: parseFloat(mainJson.depositAmount0)}, 
            pool, poolABI]
            price(inputJson).then((result) => {
                const price = Math.round((parseFloat(result.OneToken0EqualsTo_Token1) / 100) * 1000000000) / 1000000000
                // console.log(price);

                let maxPrice
                if (mainJson.maxPrice[mainJson.maxPrice.length - 1] == "%") {
                    maxPrice =  Math.round((price + ((parseFloat(mainJson.maxPrice.slice(0, -1)) / 100) * price)) * 100000000) / 100000000;
                } else {
                    maxPrice =  mainJson.maxPrice;
                }
                
                let minPrice
                if (mainJson.minPrice[mainJson.minPrice.length - 1] == "%") {
                    minPrice =  Math.round((price - ((parseFloat(mainJson.minPrice.slice(0, -1)) / 100) * price)) * 100000000) / 100000000;
                } else {
                    minPrice =  mainJson.minPrice;
                }
                
                const jsonDeposit = {
                    depositAmount1: depositAmount(price, parseFloat(inputJson[0].amount), maxPrice, minPrice),
                    maxPrice: maxPrice,
                    minPrice: minPrice
                }
                resolve(jsonDeposit)
            })
        }
    })
}

function mintMath(param) {
    return new Promise(function(resolve, reject) {
        const contractToken0 = new web3.eth.Contract(token0ABI, token0);
        const contractToken1 = new web3.eth.Contract(token1ABI, token1);
        const contractPool  = new web3.eth.Contract(poolABI, pool)
        
        contractToken0.methods.decimals().call().then((result0) => {
            contractToken1.methods.decimals().call().then((result1) => {
                contractPool.methods.tickSpacing().call().then((tickSpacing0) => {
                
                    function decimalToken0() {
                        let decimals = new BN(1)
                        while (decimals.toString().length != parseInt(result0) + 1) {
                            decimals = new BN(decimals).mul(new BN('10'))
                        }

                        let amountDeposit = param.depositAmount0
                        let amountDecimal0 = 1
                        while (amountDeposit != parseInt(amountDeposit)) {
                            amountDeposit = amountDeposit * 10
                            amountDecimal0 += 1
                        }
                        
                        deicmal0 = 1
                        while (deicmal0.toString().length != amountDecimal0) {
                            deicmal0 = deicmal0 * 10
                        }

                        // console.log(amountDeposit);
                        return (new BN(decimals.toString()).div(new BN(deicmal0.toString()))).mul(new BN(amountDeposit.toString())).toString()
                    }

                    function decimalToken1() {
                        let decimals = new BN(1)
                        while (decimals.toString().length != parseInt(result1) + 1) {
                            decimals = new BN(decimals).mul(new BN('10'))
                        }

                        let amountDeposit = param.depositAmount1
                        let amountDecimal0 = 1
                        while (amountDeposit != parseInt(amountDeposit)) {
                            amountDeposit = amountDeposit * 10
                            amountDecimal0 += 1
                        }
                        
                        deicmal0 = 1
                        while (deicmal0.toString().length != amountDecimal0) {
                            deicmal0 = deicmal0 * 10
                        }

                        // return (new BN(decimals.toString()).div(new BN(deicmal0.toString()))).mul(new BN(amountDeposit.toString())).toString()
                        return ((new BN(10)).mul(new BN(amountDeposit.toString())).div(new BN(10))).toString()
                    }

                    function priceToTick(price) {
                        const tickSpacing = tickSpacing0
                        const token0Decimals = result0
                        const token1Decimals = result1

                        let decimals
                        if (token1Decimals - token0Decimals > 0) {
                            decimals = 10 ** (token1Decimals - token0Decimals)
                        } else {
                            decimals = 10 ** (token0Decimals - token1Decimals)
                        }

                        // var integerPrice = new BN(decimals * price).toString();
                        var integerPrice = (price * decimals).toString();
                        var lnPrice = Math.log(integerPrice).toFixed(9);
                        
                        const tick0 = parseFloat(lnPrice) / 0.000099995
                        const tick = Math.round(tick0/tickSpacing)*tickSpacing

                        return tick
                    }

                    function tolerance(depositAmount) {
                        let tolerance = param.tolerance
                        let tolerance0 = 1
                        while (tolerance != parseInt(tolerance)) {
                            tolerance = tolerance * 10
                            tolerance0 += 1
                        }

                        let toleranceDecimal = 1
                        while (toleranceDecimal.toString().length != tolerance0) {
                            toleranceDecimal = toleranceDecimal * 10
                        }

                        const amount0 = new BN(depositAmount)
                        const percent = parseFloat(((new BN(tolerance).mul(new BN(amount0))).div(new BN(100))).toString()) / toleranceDecimal
                        
                        // console.log(percent.toString());
                        // console.log(amount0.toString());
                        
                        // console.log(new BN(amount0.toString()).sub(new BN(percent.toString())).toString());

                        return new BN(amount0.toString()).sub(new BN(percent.toString())).toString()
                    }
                    
                    const main = {
                        token0: param.tokenPair0,
                        token1: param.tokenPair1,
                        fee: parseFloat(param.feeTier) * 10000,
                        // tickUpper: parseFloat(param.maxPrice) * 100,
                        tickUpper: priceToTick(param.maxPrice),
                        // tickLower: parseFloat(param.minPrice) * 100,
                        tickLower: priceToTick(param.minPrice),
                        amount0Desired: decimalToken0(),
                        amount1Desired: decimalToken1(),
                        amount0Min: tolerance(decimalToken0()),
                        amount1Min: tolerance(decimalToken1()),
                        recipient: param.recipient,
                        deadline: parseInt(Math.round(+new Date()/1000).toString()) + parseInt(param.deadline)
                    }

                    // Math.round((parseFloat(priceQuote.OneToken1EqualsTo_Token0) / 100) * 1000000000) / 1000000000
                    price([poolABI, pool]).then((priceQuote) => {
                        
                        const _OneToken0EqualsTo_Token1 = Math.round((parseFloat(priceQuote.OneToken0EqualsTo_Token1) / 100) * 1000000000) / 1000000000
                        const _OneToken1EqualsTo_Token0 = Math.round((parseFloat(priceQuote.OneToken1EqualsTo_Token0) / 100) * 1000000000) / 1000000000
                        
                        if (priceToTick(_OneToken0EqualsTo_Token1)<=main.tickLower || priceToTick(_OneToken1EqualsTo_Token0)<=main.tickLower) {
                            // console.log(_OneToken0EqualsTo_Token1);
                            // console.log(_OneToken1EqualsTo_Token0);

                            const distanceFrom_OneToken1EqualsTo_Token0 = parseFloat(((param.maxPrice - _OneToken1EqualsTo_Token0) + (param.minPrice - _OneToken1EqualsTo_Token0)).toFixed(5))
                            const distanceFrom_OneToken0EqualsTo_Token1 = parseFloat(((param.maxPrice - _OneToken0EqualsTo_Token1) + (param.minPrice - _OneToken0EqualsTo_Token1)).toFixed(5))
                            if (distanceFrom_OneToken1EqualsTo_Token0 < distanceFrom_OneToken0EqualsTo_Token1) {
                                console.log('closer to _OneToken1EqualsTo_Token0');
                                console.log(_OneToken1EqualsTo_Token0);

                                percentMax = parseInt(((param.maxPrice / _OneToken1EqualsTo_Token0) * 100) - 100)
                                percentMin = parseInt(((param.minPrice / _OneToken1EqualsTo_Token0) * 100) - 100)

                                newPercentMax = ((percentMax / 100) * _OneToken0EqualsTo_Token1) + _OneToken0EqualsTo_Token1
                                newPercentMin = ((percentMin / 100) * _OneToken0EqualsTo_Token1) + _OneToken0EqualsTo_Token1
                                console.log(percentMax, percentMin);
                                console.log(newPercentMax, newPercentMin);
                                console.log(priceToTick(newPercentMax), priceToTick(newPercentMin));
                            } else if (distanceFrom_OneToken1EqualsTo_Token0 > distanceFrom_OneToken0EqualsTo_Token1) {
                                console.log('closer to _OneToken0EqualsTo_Token1');
                                console.log(_OneToken0EqualsTo_Token1);

                                percentMax = parseInt(((param.maxPrice / _OneToken0EqualsTo_Token1) * 100) - 100)
                                percentMin = parseInt(((param.minPrice / _OneToken0EqualsTo_Token1) * 100) - 100)

                                newPercentMax = ((percentMax / 100) * _OneToken1EqualsTo_Token0) + _OneToken1EqualsTo_Token0
                                newPercentMin = ((percentMin / 100) * _OneToken1EqualsTo_Token0) + _OneToken1EqualsTo_Token0
                                console.log(percentMax, percentMin);
                                console.log(newPercentMax, newPercentMin);
                                console.log(priceToTick(newPercentMax), priceToTick(newPercentMin));
                            }

                            resolve('err')
                        } else {
                            resolve(main)
                        }
                    })
                })
            })
        })
    })
}

function approve(token0Amount, token1Amount) {
    return new Promise((resolve, reject) => {
        const contractToken0 = new web3.eth.Contract(token0ABI, token0);
        const contractToken1 = new web3.eth.Contract(token1ABI, token1);

        contractToken0.methods.approve(router, token0Amount).send({from: WHALE, gas:GAS}).then((result0) => {
            contractToken1.methods.approve(router, token1Amount).send({from: WHALE, gas:GAS}).then((result1) => {
                resolve({
                    token0ApprovalHash: result0.transactionHash,
                    token1ApprovalHash: result1.transactionHash
                })
            })
        })
    })    
}


//             token0,                                             // token0: token0
//             token1,                                             // token1: token1
//             3000,                                               // fee: pairFee (0.3 => 3000, 0.05 => 500, ....)
//             190800,                                             // tickLower: parseInt(slot0.tick) - tickSpacing * 2
//             196620,                                             // tickUpper: parseInt(slot0.tick) + tickSpacing * 2
//             999785776,                                          // amount0Desired: 10
//             "230534265474217416",                               // amount1Desired: 10
//             0,                                                  // amount0Min: 0
//             0,                                                  // amount1Min: 0
//             WHALE,                                              // recipient: accounts[0]
//             Math.round(+new Date()/1000).toString()       // deadline: 5000000000


function mint(param) {
    return new Promise((resolve, reject) => {
        contractRouter.methods.mint([
            param[0],
            param[1],
            param[2],
            // 190800,
            param[3],
            // 196620,
            param[4],
            param[5],
            param[6],
            // param[7],
            0,
            // param[8],
            0,
            param[9],
            param[10],
        ]).send({from: WHALE, gas:GAS}).then((result) => {
            resolve(result)
        })
    })
}

mintMath({
    tokenPair0: token0,
    tokenPair1: token1,
    feeTier: "0.3",
    
    // maxPrice: 2303.1,
    maxPrice: 0.00098777,
    // minPrice: 763.62,
    minPrice: 0.00033146,
    
    depositAmount0: 1,
    depositAmount1: 0.00146206,

    tolerance: "50",
    recipient: WHALE,
    deadline: "3600"

}).then((result) => {
    console.log(result);
    approve(result.amount0Desired, result.amount1Desired).then((result0) => {
        mint([
            result.token0, 
            result.token1, 
            result.fee, 
            result.tickLower, 
            result.tickUpper, 
            result.amount0Desired, 
            result.amount1Desired, 
            result.amount0Min, 
            result.amount1Min, 
            result.recipient, 
            result.deadline
        ]).then((result1) => {
        console.log(result);
        console.log(result0);
        console.log(JSON.stringify(result1));
        })
    })
})

// getAmountOut({
//     tokenPair0: token0,
//     tokenPair1: token1,
//     feeTier: "0.3",

//     // maxPrice: 2303.1,
//     maxPrice: 0.00075859,
//     // 0.00099372
//     // minPrice: 763.62,
//     minPrice: 0.00047224,
    
//     depositAmount0: "1",
//     // depositAmount1: "1",
// }).then((result) => {
//     console.log(result);
// })
