function print(callback) {
    let escritorioslista = ""
    for (let i = 0; i < callback.escritorios.length; i++) {
        escritorioslista += 
        `<button class="escritorio" onclick="abrirescritorio(${callback.escritorios[i].numero})">
            🖥️${callback.escritorios[i].numero}
        </button>`
    }

    if (escritorioslista.length == 0) {
        escritorioslista = `<div class="escritorio2"> (ninguno) </div>`
    }
    escritorioscont.innerHTML = '<div class="tituloescritorios">escritorios activos:</div>' + escritorioslista
}

const socket = io();

socket.on('actualizarescritorios', (callback) => {
    print(callback);
});


socket.on('connect', () => {
    console.log("En linea");
    socket.emit('escritorios',(callback) => {
        print(callback)
    });
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});


// En el servidor, escucha el evento 'saludar' y emite a todos excepto al cliente actual
socket.on('saluden', (data) => {
    console.log(data);
});

pruebabtn.addEventListener('click', () => {
    const mensaje = {
        nombre: prueba.value,
    }
// Cliente que envía el mensaje lo resive
    socket.emit('saludar', mensaje,(msg) => {
        console.log(msg);
    });
});


fechabtn.addEventListener('click', () => {
    socket.emit('devuelvaFecha',(msg) => {
        console.log(msg);
    });
});




function abrirescritorio(x) {
    let escritorioadd = parseInt(escritorionum.value)
    if (x !== undefined){
        escritorioadd = x
    }
    socket.emit('escritorios',(callback) => {
    let escritorios = callback.escritorios
    if (escritorioadd > 0 && !isNaN(escritorioadd)) {
        // Agregar el número de escritorio como parámetro en la URL de la página "Escritorio"
        window.open(`./components/escritorio.html?escritorio=${escritorioadd}`, '_blank');
        socket.emit('escritorioadd',escritorioadd,(callback) => {
            print(callback)
        });
        
    } else {
        if (escritorionum.value.trim() === "") {
            escritorioerror.textContent = 'Por favor digite el numero del escritorio'
        } else if (escritorionum.value <= 0) {
            escritorioerror.textContent = 'El numero del escritorio debe ser mayor que 0'
        } else if (escritorios.includes(escritorioadd)) {
            
        }
    }
    });
};



escritoriosresetbtn.addEventListener('click', () => {
    socket.emit('escritoriosreset',(callback) => {
        print(callback)
    });
    
});




function upload(files) {

}