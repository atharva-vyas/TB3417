const BN = require("bn.js");
const { sendEther } = require("./util");
// const { DAI, WBTC, WBTC_WHALE } = require("./config");

// 0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2
const WBTC_WHALE = "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2"
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
const WETH_10 = "0xf4BB2e28688e89fCcE3c0580D37d36A7672E8A9F"

const IERC20 = artifacts.require("IERC20");
const TestUniswap = artifacts.require("TestUniswap");

contract("TestUniswap", (accounts) => {
  const WHALE = WBTC_WHALE;
  const AMOUNT_IN = 100000000;
  const AMOUNT_OUT_MIN = 1;
  const TOKEN_IN = WBTC;
  const TOKEN_OUT = DAI;
  const TO = accounts[0];

  let testUniswap;
  let tokenIn;
  let tokenOut;
  beforeEach(async () => {
    tokenIn = await IERC20.at(TOKEN_IN);
    tokenOut = await IERC20.at(TOKEN_OUT);
    testUniswap = await TestUniswap.new();

    // make sure WHALE has enough ETH to send tx
    // await sendEther(web3, accounts[0], WHALE, 1);
    await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: WHALE });
  });

  it("should pass", async () => {
    await testUniswap.swap(
      tokenIn.address,
      tokenOut.address,
      AMOUNT_IN,
      AMOUNT_OUT_MIN,
      TO,
      {
        from: WHALE,
      }
    );

    console.log(`in ${AMOUNT_IN}`);
    console.log(`out ${await tokenOut.balanceOf(TO)}`);
  });
});
