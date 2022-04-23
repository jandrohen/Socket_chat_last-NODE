class Users {

    constructor() {
        this.persons = [];
    }

    addPerson(id, name, room) {

        let person = {id, name, room};

        this.persons.push(person);

        return this.persons;
    }

    getPerson(id) {

        return this.persons.filter(person => person.id === id)[0];
    }

    getPersons() {
        return this.persons;
    }

    getPersonsForRoom(room) {
        return this.persons.filter(person => person.room === room);
    }

    async removePerson(id) {

        let personRemoved = await this.getPerson(id);

        if (personRemoved)
        this.persons = this.persons.filter(person => person.id !== id);

        return personRemoved;
    }
}

module.exports = {
    Users
}
