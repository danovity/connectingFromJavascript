//Implement an add_person.js script that takes in the first name, last name and date of a famous person as three command line arguments and uses Knex to perform an insert.

const settings = require("./settings");

var knex = require('knex')({
    client: 'pg',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port
    }
});

var query = process.argv.slice(2);

const insertPeople = function (query) {
    console.log(query);
    const firstName = query[0];
    const lastName = query[1];
    const birthdate = query[2];

    knex('famous_people').insert({
        first_name: firstName,
        last_name: lastName,
        birthdate: birthdate
    }).then(function (result) {
        console.log(result);
    });

}

insertPeople(query);