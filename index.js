import * as http from 'http';
import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'
import express from 'express'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

// Configuración del puerto serie
const portPath = 'COM6'; // Cambia 'COM3' por la ruta correcta de tu puerto serie
const port = new SerialPort({
    path: portPath,
    baudRate: 9600
});
const parser = port.pipe(new ReadlineParser());

// Comunicación con el Arduino
let ardMouseX = 0;
let ardMouseY = 0;

parser.on('data', (data) => {
    // Parsea los datos del Arduino y actualiza las coordenadas del puntero
    const parts = data.split(':');
    const label = parts[0];
    const value = parseFloat(parts[1]);
    if (label === 'X') {
        ardMouseX = value;
    } else if (label === 'Y') {
        ardMouseY = value;
    } else if (label === 'F' && value === 1) {
        // El Arduino envía un evento de clic
        io.emit('click', { x: ardMouseX, y: ardMouseY });
    }
    console.log('Datos recibidos', data)
});

// Configuración del juego
// (Agrega aquí la lógica de juego, como las funciones preload, setup, draw, mousePressed, etc.)

// Establece la comunicación con el cliente
io.on('connection', (socket) => {
    // Escucha eventos del cliente, si es necesario
    // Ejemplo: socket.on('eventoDelCliente', (data) => { /* manejar evento */ });

    // Cuando el juego envía un clic del mouse, reenviarlo al Arduino
    socket.on('click', (data) => {
        port.write(`C:${data.x},${data.y}\n`, (err) => {
            if (err) {
                console.error('Error al enviar datos al Arduino:', err.message);
            }
        });
    });

    socket.on('disconnect', () => {
        // Manejar la desconexión del cliente
    });
});

// Inicia el servidor
const portNumber = 3000;
server.listen(portNumber, () => {
    console.log(`Servidor escuchando en el puerto ${portNumber}`);
});
