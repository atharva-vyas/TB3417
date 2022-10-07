# https://ethereum.stackexchange.com/questions/111151/uniswapv3-quoter-functions-quoteexactinput-quoteexactoutput-works-not-as-expe


from web3 import Web3, HTTPProvider
from eth_abi.packed import encode_single_packed, encode_abi_packed
import json

w3 = Web3(HTTPProvider("http://127.0.0.1:8545"))
w3.eth.handleRevert = True

quoter_contract_address = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"

quoter_abi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"uint256","name":"amountIn","type":"uint256"}],"name":"quoteExactInput","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"name":"quoteExactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"quoteExactOutput","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"name":"quoteExactOutputSingle","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"path","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"view","type":"function"}]

quoter_contract =w3.eth.contract(address=w3.toChecksumAddress(quoter_contract_address), abi=quoter_abi)

weth_token = { 
    "address" : "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 
    "symbol" : "WETH", 
    "name" : "Wrapped Ether",
    "decimals" : 18 
    }
dai_token = { 
    "address" :"0x6B175474E89094C44Da98b954EedeAC495271d0F", 
    "symbol" : "DAI", 
    "name" : "DAI", 
    "decimals" : 18 
    }
cdai_token = { 
    "address" : "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643", 
    "symbol" : "cDAI", 
    "name" : "Compound DAI", 
    "decimals" : 8 
    }

#This works
print()
print("This works")

#Route: ('DAI', 500, 'cDAI', 3000, 'WETH')
route_types = ['address', 'uint24', 'address', 'uint24', 'address']
route_tuple = (str(dai_token["address"]), int(500), str(cdai_token["address"]), int(3000), str(weth_token["address"]))
route_str = (str(dai_token["symbol"]), int(500), str(cdai_token["symbol"]), int(3000), str(weth_token["symbol"]))

# print(f"Route: {route_str} ")

#Test QuoteExactInput with 1 DAI Input
input_token_amount = int(1 * (10 ** int(dai_token["decimals"])))
       
route_encoded = encode_abi_packed(route_types, route_tuple)  

amount_out = quoter_contract.functions.quoteExactInput(route_encoded, int(input_token_amount)).call()
amount_out = amount_out / (10 ** int(weth_token["decimals"]))

print("Output Amount: {:.8f} WETH for 1 DAI".format(amount_out))

#Test QuoteExactOutput with 1 DAI Output
output_token_amount = int(1 * (10 ** int(dai_token["decimals"])))
       
route_encoded = encode_abi_packed(route_types, route_tuple)  

amount_in = quoter_contract.functions.quoteExactOutput(route_encoded, int(output_token_amount)).call()
amount_in = amount_in / (10 ** int(weth_token["decimals"]))

print("Input Amount: {:.8f} WETH for 1 DAI".format(amount_in))





print()
print("This cause error")

#Route: ('WETH', 3000, 'cDAI', 500, 'DAI')
route_types = ['address', 'uint24', 'address', 'uint24', 'address']
route_tuple = (str(weth_token["address"]), int(3000), str(cdai_token["address"]), int(500), str(dai_token["address"]))
route_str = (str(weth_token["symbol"]), int(3000), str(cdai_token["symbol"]), int(500), str(dai_token["symbol"]))

route_tuple = (str(weth_token["address"]), int(3000), str(cdai_token["address"]), int(500), str(dai_token["address"]))
route_str = (str(weth_token["symbol"]), int(3000), str(cdai_token["symbol"]), int(500), str(dai_token["symbol"]))

print(f"Route: {route_str} ")

#Test QuoteExactInput with 1 WETH Input
input_token_amount = int(1 * (10 ** int(weth_token["decimals"])))
       
route_encoded = encode_abi_packed(route_types, route_tuple)  

amount_out = quoter_contract.functions.quoteExactInput(route_encoded, int(input_token_amount)).call()
amount_out = amount_out / (10 ** int(dai_token["decimals"]))

print("Output Amount: {:.8f} DAI for 1 WETH".format(amount_out))



# #Test QuoteExactOutput with 1 WETH Output
# output_token_amount = int(1 * (10 ** int(weth_token["decimals"])))
       
# route_encoded = encode_abi_packed(route_types, route_tuple)  

# amount_in = quoter_contract.functions.quoteExactOutput(route_encoded, int(output_token_amount)).call()
# amount_in = amount_in / (10 ** int(dai_token["decimals"]))

# print("Input Amount: {:.8f} DAI for 1 WETH".format(amount_in))