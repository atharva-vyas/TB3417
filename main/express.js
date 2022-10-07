const express = require('express')
const app = express()

app.get('/', function (req, res) {
  console.log('lmao');
  res.send('Hello World')
})

// 192.168.2.3
app.listen(3000, '192.168.2.4')

/*
AT
AT+RST
AT+CWMODE=1
AT+CWLAP
AT+CWJAP=”SSID”,”PASSWORD”
AT+CIFSR
*/
