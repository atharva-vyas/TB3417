const BN = require('bn.js');
// https://www.google.com/search?q=uniswap+v3+get+lp+address
// https://blog.apy.vision/uniswapnft/
// https://etherscan.io/address/0x1f98407aab862cddef78ed252d6f557aa5b0f00d#writeContract

class token {
    totalSupply(router) {
        return new Promise(async (resolve, reject) => {
            router.methods.totalSupply().call().then(async (result) => {
                resolve(JSON.stringify(result))
            }).catch((err) => {
                reject('totalSupply =>', err.toString())
            });
        })
    }
    
    allowance(router, sender, recipient) {
        return new Promise(async (resolve, reject) => {
            router.methods.allowance(sender, recipient).call().then(async (result) => {
                resolve(JSON.stringify(result))
            }).catch((err) => {
                // console.log(err);
                reject('allowance =>', err.toString())
            });
        })    
    }

    balanceOf(address) {
        return new Promise(async (resolve, reject) => {
            router.methods.balanceOf(address).call().then(async (result) => {
                resolve(JSON.stringify(result))
            }).catch((err) => {
                reject('approve =>', err.toString())
            });
        })
    }

    approve(router, routerAddress, amountIn, sender, gas) {
        return new Promise(async (resolve, reject) => {
            router.methods.approve(routerAddress, amountIn).send({from: sender, gas: gas}).then(async (result) => {
                resolve(JSON.stringify(result))
            }).catch((err) => {
                reject('approve =>', err.toString())
            });
        })
    }
}

class dex {
    swapExactTokensForTokens(router, amountIn, tolerance, path, sender, recipient, expiration, gas) {    
        function getAmountsOut() {
            return new Promise(async (resolve0, reject0) => {
                router.methods.getAmountsOut(amountIn, path).call().then(async (amountOut) => {
                    resolve0(amountOut[path.length - 1])
                }).catch((err) => {
                    reject0('getAmountsOut =>', err.toString())
                });
            })
        }

        return new Promise(async (resolve, reject) => {
            const amountOutMin = new BN(await getAmountsOut()).mul(new BN(tolerance)).div(new BN(100));
            router.methods.swapExactTokensForTokens(
                amountIn, 
                await amountOutMin, 
                path, 
                recipient, 
                Math.floor((Date.now() / 1000)) + expiration
            ).send({from: sender, gas: gas}).then(async (result) => {
                resolve(JSON.stringify(result))
            }).catch((err) => {
                reject('getAmountsOut =>', err.toString())
            });
        })
    }
}

module.exports = {
    token : token,
    dex : dex
}
