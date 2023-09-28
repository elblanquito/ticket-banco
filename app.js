import express from "express";
import "dotenv/config";
import controllerSockets from "./sockets/controller.js"
import http from 'http'
//import cliente  from "./routes/cliente.js";
//import bus  from "./routes/bus.js";
import * as io from 'socket.io'


const port=process.env.PORT
let app = express();
app.use(express.json());
app.use(express.static('public'))
const server = http.createServer(app)

let ioServer = new io.Server(server);
app.set('socketio', io)

ioServer.on('connection', controllerSockets);

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});