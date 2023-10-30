const express = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const SerialPort = require('serialport');

// Configurar el puerto serie
const port = new SerialPort('COM3', { baudRate: 9600 }); // Reemplaza 'COM3' por el puerto del Arduino

// Resto de la configuración del servidor Express aquí...

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Maneja los eventos del socket aquí
  socket.on('flashDuckHit', (index) => {
    console.log(`Se golpeó un pato flash en el índice ${index}`);

    // Envía un comando al Arduino a través del puerto serie
    port.write(`F${index}\n`); // Ejemplo: envía 'F' seguido del índice y un salto de línea
  });
});

// Resto de la configuración y enrutamiento de tu servidor Express aquí...

http.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
