import math

constant = 1.0001
price = 1876.39

i = 0
try:
    while constant ** i <= price:
        if i > 10000000:
            print('value of i :-', str(i))
            input('press any key to break')
            break
        
        i += 60
except:
    print('pricess failed')
    print(i)
    
print(i)
print('value found, i =', str(i))

# al = (math.log(math.sqrt(price)) * 2) / math.log(constant)

# al = (math.sqrt(constant ** price)) #* (2 ** 96)

# print(al)