function print(callback,x) {
    
    let escritorioslista = ""
    for (let i = 0; i < callback.escritorios.length; i++) {

        escritorioslista += 
        `<button class="escritorio escritorio${i}")">
            <div class="escritorioticket">Atendiendo ticket: ${callback.escritorios[i].ticket}</div>
            <div class="escritorioname">Escritorio #${callback.escritorios[i].numero}</div>
        </button>`
    }

    if (escritorioslista.length == 0) {
        escritorioslista = ``
    }
    escritorioscont.innerHTML = escritorioslista
    if (x == true) {
        notification()
    }
}


function notification(){
    // Crea un nuevo objeto Audio y especifica la ruta del archivo de audio
    var audio = new Audio('./sound/timbretimbrecasa.mp3');
    // Establece el volumen (un valor entre 0 y 1, donde 0 es silencio total y 1 es el volumen máximo)
    audio.volume = 0.5; // Aquí se establece el volumen al 50%
    // Reproduce el sonido
    audio.play();
}

const socket = io();

socket.on('actualizarescritorios', (callback) => {
    print(callback, true);
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









function upload(files) {

}