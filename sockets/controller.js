const controllerSockets = (socket) => {
    console.log(socket.id);

    socket.on('saludar', async (mensaje, callback) => {
        console.log(`hola ${mensaje.nombre}`);
        callback( "LLego el mensaje" );
        socket.broadcast.emit( 'saluden', `Todos saluden a ${mensaje.nombre}`);
    });

    socket.on('devuelvaFecha',async(callback)=>{
        callback(new Date())
    })


    socket.on('nose', async (mensaje, callback) => {
        console.log(`hola ${mensaje.nombre}`);
        callback( "LLego el mensaje" );
        socket.broadcast.emit( 'saluden', `Todos saluden a ${mensaje.nombre}`);
    });





    function actualizar() {
        socket.broadcast.emit('actualizartickets',{
            'tickets': tickets,
            'ticket': ticket,
            'estado': true
        })
    }
    socket.on('tickets',async(callback)=>{
        callback({
            'tickets': tickets,
            'ticket': ticket,
            'estado': true
        })
    })
    socket.on('ticketadd',async(callback)=>{
        tickets.push(ticket)
        ticket++
        callback({
            'tickets': tickets,
            'ticket': ticket,
            'estado': true
        })
        actualizar()
    })
    socket.on('ticketdel',async(ticketdel,callback)=>{
        ticketdel = parseInt(ticketdel)
        let indice = tickets.indexOf(ticketdel);
        if (indice !== -1) {// Si el número existe en el array, eliminarlo
            tickets.splice(indice, 1)
            callback({
                'tickets': tickets,
                'ticket': ticket,
                'estado': true
            })
        } else{
            callback({
                'tickets': tickets,
                'ticket': ticket,
                'estado': false
            })
        }
        actualizar()
    })





    function actualizar2() {
        socket.broadcast.emit('actualizarescritorios',{
            'escritorios': escritorios,
            'estado': true
        })
    }


    socket.on('escritorios',async(callback)=>{
        callback({
            'escritorios': escritorios,
            'estado': true
        })
    })
    socket.on('escritorioadd',async(escritorioadd,callback)=>{
        if (!escritorios.includes(escritorioadd)){
            escritorios.push(escritorioadd)
        }
        callback({
            'escritorios': escritorios,
            'estado': true
        })
        actualizar2()
    })

    socket.on('escritoriosreset',async(callback)=>{
            escritorios = []
            callback({
                'escritorios': escritorios,
            })
        actualizar2()
    })



}

let ticket = 0
let tickets = []

let escritorios = []

export default controllerSockets
