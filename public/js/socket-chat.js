let socket = io();

let params = new URLSearchParams( window.location.search)

    if (!params.has('name')) {
        window.location = 'index.html';
        throw new Error('El nombre es necesario');
    }

let user = {
    name: params.get('name')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('onChat', user, function ( resp ) {
        console.log('Usuarios conectados', resp);
    } );
});

// Listen
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Send Information
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Listen Information
socket.on('createMessage', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Listen users changed
// user login or logout in a chat room
socket.on('listPerson', function(persons) {
    console.log(persons);
});
