const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
const os = require('os')
const disk = require('diskusage')

const wss = new WebSocket.Server({ port:3000});

wss.on('connection', function connection(ws) {
  console.log('A client connected!');
  setInterval(() => {
    var message = {
      "cpuUsage": os.cpus(),
      "totalMem": os.totalmem(),
      "freeMem": os.freemem()
    }
    disk.check('/', (err, res) => {
      if (!err) {
        message['freeDisk']=res.free
        message['totalDisk']=res.total
      }
    })
    ws.send(JSON.stringify(message))
  },1000)
});

