const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configura el servidor HTTP
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('mousemove', (data) => {
    console.log('Datos del movimiento del ratón recibidos:', data);

    // Envia los datos del movimiento del ratón al Arduino a través de la comunicación serie
    // Puedes utilizar un módulo como 'johnny-five' para comunicarte con el Arduino.
  });

  socket.on('shoot', () => {
    console.log('Comando de disparo recibido');

    // Envía un comando al Arduino para simular el disparo
    // Puedes usar la comunicación serie, como se describió en respuestas anteriores.
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});