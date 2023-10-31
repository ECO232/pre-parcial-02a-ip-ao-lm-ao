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
// Cambia 'COM3' por la ruta correcta de tu puerto serie
const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600
});
const parser = port.pipe(new ReadlineParser());

port.on('error', function (err) {
    console.log('Error: ', err.message);
})

// Comunicación con el Arduino
let counter = 0;
let arduinoInput = [];
parser.on('data', (data) => {
    console.log(data);
    let input = data.split(":");
    //console.log(input[1]);
    if (input[0] == "X") {
        arduinoInput[0] = input[1];
        counter++;
    }else if (input[0] == "Y") {
        arduinoInput[1] = input[1];
        counter++;
    }else if (input[0] == "F") {
        arduinoInput[2] = input[1]
        counter++
    }else{
        console.log("This doesn't work", input[0]);
    }
    if (counter == 3) {
        counter = 0;
        io.emit("mensaje", {"x":arduinoInput[0], "y":arduinoInput[1], "f":arduinoInput[2]})
    }
});

// Configuración del juego
// (Agrega aquí la lógica de juego, como las funciones preload, setup, draw, mousePressed, etc.)

// Establece la comunicación con el cliente
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    // Escucha eventos del cliente, si es necesario
    // Ejemplo: socket.on('eventoDelCliente', (data) => { /* manejar evento */ });

    // Cuando el juego envía un clic del mouse, reenviarlo al Arduino
    /*socket.on('click', (data) => {
        port.write(`C:${data.x},${data.y}\n`, (err) => {
            if (err) {
                console.error('Error al enviar datos al Arduino:', err.message);
            }
        });
    });*/

    socket.on('disconnect', () => {
        // Manejar la desconexión del cliente
        console.log('Usuario desconectado');
    });
});

// Inicia el servidor
const portNumber = 3000;
server.listen(portNumber, () => {
    console.log(`Servidor escuchando en el puerto ${portNumber}`);
});
