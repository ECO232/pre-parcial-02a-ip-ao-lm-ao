const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const SerialPort = require('serialport'); // Agrega la biblioteca SerialPort
const port = new SerialPort('COM3', { baudRate: 9600 }); // Reemplaza 'COM3' con el nombre de tu puerto Arduino

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('shoot', (data) => {
    console.log('Comando de disparo recibido:', data);

    // Envía el comando al Arduino a través de la comunicación serie
    port.write(data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
