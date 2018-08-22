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
var query = process.argv.slice(2)[0];

const getPeople = function (query, callback) {
    knex.select('*')
        .from('famous_people')
        .where({
            first_name: query
        })
        .then(function (result) {
            console.log(result);
            callback(result);
        })

        .catch(function (error) {
            console.error(error)
        });
}

function displayResult(result) {
    var resultLength = result.length;
    var outputMsg = `Searching ...
    Found ${resultLength} person(s) by the name '${query}':`;

    var finalResult =
        outputMsg +
        result.map((cur, i) => {
            var month = new Date(cur.birthdate).getMonth(); //months from 1-12
            var day = new Date(cur.birthdate).getDay();
            var year = new Date(cur.birthdate).getYear();
            return `- ${i + 1}: ${cur.first_name}  ${
        cur.last_name
      }, born '19${year}-${month}-${day+1}'`;
        });
    console.log(finalResult);
    return finalResult;
}

getPeople(query, displayResult);