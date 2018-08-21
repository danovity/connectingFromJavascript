const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port
});

var query = process.argv.slice(2)[0];

const getPeople = function (query, callback) {
    let final;
    client.connect(err => {
        if (err) {
            return console.error("Connection Error", err);
        }

        client.query(
            `SELECT * FROM famous_people WHERE first_name = $1::text;`, [query]).then((result) => {

            final = callback(result.rows);

            client.end();
            return final;
        }).catch(err => {
            if (err) {
                return console.error('error running query', err);
            }
        });

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