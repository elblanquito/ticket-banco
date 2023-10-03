const params = new URLSearchParams(window.location.search);
const numeroescritorio = params.get('escritorio');

document.title = '🖥️ '+ '[ '  + numeroescritorio + ' ]'
titulo.innerHTML = '💾 escritorio #' + numeroescritorio + ' 💾'

function print(callback) {
    tickettxt.innerHTML = 'generar ticket numero: '+ callback.ticket
    console.log(callback.tickets)

    let ticketslista = ""
    for (let i = 0; i < callback.tickets.length; i++) {
        ticketslista += 
        `<button class="ticket" onclick="atender(${callback.tickets[i]})">
            tiket #${callback.tickets[i]}
        </button>`
    }

    if (ticketslista.length == 0) {
        ticketslista = `<div class="ticket2"> (ninguno) </div>`
    }
    ticketscont.innerHTML = '<div>pendientes:</div>' + ticketslista
}


function print2(callback) {
    escritoriotxt.innerHTML = 'escritorio: '+ callback.escritorio
}

function atender(ticket){
    console.log(ticket)
    let ticketdel = ticket
    socket.emit('ticketdel', ticketdel, /* numeroescritorio , */(callback) => {
        console.log(callback.estado);
        print(callback)
    });
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