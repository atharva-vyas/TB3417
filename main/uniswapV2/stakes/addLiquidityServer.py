from hashlib import sha3_512
from flask import Flask, request
app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def login():
    body = request.get_json()
    
    A = int(body['A'])       # amount of token A in uniswap
    B = int(body['B'])       # amount of token B in uniswap
    f = body['f']       # trading fee (%0.003)
    a = int(body['a'])       # amount of token A that i have
    # b = body['b']       # amount of token B that i need
    # s = body['s']       # amount of token to swap from A to B

    s1 = (-1 * (2-f) * A) * 1000
    s2 = (((2-f) * A) ** 2) * 1000000
    s3 = (4 * (1 - f) * A*a) * 1000000
    s4 = (2 * (1-f)) * 1000
    
    s = (s1 + (((s2 + s3) ** 0.5))) / s4
    
    b = (B * (1-f) * s) / (A + ((1-f) * s))

    json = {
        "amountOfTokenToSwap": str(round(s)),
        "amountOfBNeeded": str(round(b))
    }
        
    return json

if __name__ == '__main__':
    app.run(host='localhost', port=3000, debug=True)