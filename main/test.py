HOST = "192.168.2.3"
PORT = '3000'

tets = "AT+CIPSTART=0,\"TCP\",\""+ HOST +"\","+ PORT,16,"OK"
print(tets)

# AT+CIPMUX=1
one = 'AT+CIPSTART=0,"TCP","192.168.2.3",3000'
print(one)

# AT+CIPSEND=0, GET /