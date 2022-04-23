class Users {

    constructor() {
        this.persons = [];
    }

    addPerson(id, name) {

        let person = {id, name};

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
        // ...
    }

    removePerson(id) {

        let personRemoved = this.getPersons(id);

        this.persons.filter(person => person.id !== id);

        return personRemoved;
    }
}

module.exports = {
    Users
}
