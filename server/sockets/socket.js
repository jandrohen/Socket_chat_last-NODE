const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils')

const users = new Users();

io.on('connection', (client) => {

    // Entrance to the chat room
    client.on('onChat', (data, callback) =>{

        if (!data.name) {
            return callback({
                error: true,
                msg: 'El nombre es necesario'
            });
        }

        let persons = users.addPerson(client.id, data.name);

        client.broadcast.emit('listPerson', users.getPersons());

        callback(persons);
    });

    // Broadcasts a message from a user to the other members of the room
    client.on('createMessage', (data) => {

        let person = users.getPerson(client.id);

        let message = createMessage(person.name,data.message);
        client.broadcast.emit('createMessage', message);
    })

    // Disconnect to the chat room
    client.on('disconnect', () => {

        let personRemoved = users.removePerson(client.id);

        client.broadcast.emit('createMessage', createMessage('Administrator', `${personRemoved.name} salió`));
        client.broadcast.emit('listPerson', users.getPersons());

    })
});
