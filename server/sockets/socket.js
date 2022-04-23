const { io } = require('../server');
const { Users } = require('../classes/users');

const users = new Users();

io.on('connection', (client) => {

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

    client.on('disconnect', () => {

        let personRemoved = users.removePerson(client.id);

        client.broadcast.emit('createMessage', { user:'Administrator', mensaje:`${personRemoved.name} abandonó el chat`});
        client.broadcast.emit('listPerson', users.getPersons());

    })
});
