function print(callback) {
    tickettxt.innerHTML = 'generar ticket numero: '+ callback.ticket
    ticketstxt.innerHTML = 'tickets totales: '+ callback.tickets
}



const socket = io();
socket.on('actualizartickets', (callback) => {
    print(callback);
});

socket.on('connect', () => {
    console.log("En linea");
    socket.emit('tickets',(callback) => {
        print(callback)
    });
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

socket.emit('tickets',(callback) => {
    print(callback)
});


ticketbtn.addEventListener('click', () => {
    socket.emit('ticketadd',(callback) => {
        print(callback)
    });
});

ticketdelbtn.addEventListener('click', () => {
    let ticketdel = ticketdelinput.value
    socket.emit('ticketdel', ticketdel ,(callback) => {
        console.log(callback.estado);
        print(callback)
    });
});


function upload(files) {

}