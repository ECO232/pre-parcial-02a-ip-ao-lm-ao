import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'
import express from 'express'
//const express = require('express')
const app = express()
const protocolConfiguration = {
    path: 'COM3',
    baudRate: 9600
}
const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());
app.get('/potenciometro', (req, res)=>{
    port.write('potenciometro\n', function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
    res.send(parser.read()); /////// 
})
port.on('error', function(err) {
    console.log('Error: ', err.message);
})
parser.on('data', (data) => {    
    console.log(data);
});
app.listen(3000,()=>{
    console.log("Node Server Starts at 3000");
});