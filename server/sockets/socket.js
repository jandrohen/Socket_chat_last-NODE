const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils')

const users = new Users();

io.on('connection', (client) => {

    // Entrance to the chat room
    client.on('onChat', (data, callback) =>{

        if (!data.name || !data.room) {
            return callback({
                error: true,
                msg: 'El nombre es necesario'
            });
        }

        // Join a user to a particular room
        client.join(data.room)

        let persons = users.addPerson(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('listPerson', users.getPersonsForRoom(data.room));

        callback(users.getPersonsForRoom(data.room));
    });

    // Broadcasts a message from a user to the other members of the room
    client.on('createMessage', (data) => {

        let person = users.getPerson(client.id);

        let message = createMessage(person.name,data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
    })

    // Send a private message to a specific user
    client.on('messagePrivate', data => {

        let person = users.getPerson(client.id);
        client.broadcast.to(data.from).emit('messagePrivate', createMessage(person.name, data.message));
    })

    // Disconnect to the chat room
    client.on('disconnect', async () => {

        let personRemoved = await users.removePerson(client.id);

        client.broadcast.to(personRemoved.room).emit('createMessage', createMessage('Administrator', `${personRemoved.name} salió`));
        client.broadcast.to(personRemoved.room).emit('listPerson', users.getPersonsForRoom(personRemoved.room));

    })
});
