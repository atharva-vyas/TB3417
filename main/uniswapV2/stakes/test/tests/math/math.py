from hashlib import sha3_512


A = 1           # amount of token A in uniswap
B = 1           # amount of token B in uniswap
f = 3 / 1000    # trading fee (%0.003)
a = 1           # amount of token A that i have
b = 1           # amount of token B that i need
s = 1           # amount of token to swap from A to B

s01 = ((1997*A)*-1)
s02 = (3988009*(A**2))
s03 = (3988000*A*a)
# s = (((1997*A)*-1) + (3988009*(A**2) + (3988000*A*a) ** 0.5)) / 1994
s0 = (s01 + ((s02 + s03) ** 0.5)) / 1994

s11 = (-1*(2-f)*A) * 1000
s12 = (((2-f) * A)**2) * 1000000
s13 = (4 * (1 - f) *A*a) * 1000000
s14 = (2 * (1-f)) * 1000
# q = (-1*(2-f)*A) + (((((2-f) * A)**2) + (4 * (1 - f) *A*a)) ** 0.5) / (2 * (1-f))
swap = (s11 + (((s12 + s13) ** 0.5))) / s14

# print(s0)
# print(s1)

b = (B * (1-f) * swap) / (A + ((1-f) * swap))

print(swap)
print(b)
# print(str(B * (1-f) * swap), str(A + ((1-f) * swap)))