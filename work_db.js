const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345678',
    port: 5432,
    statement_timeout: 60000, 
});

client.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

    client.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error('Error executing query:', err);
        } else {
            console.log('Query result:', res.rows);
        }

        client.end((err) => {
            if (err) {
                console.error('Error closing the connection:', err);
            } else {
                console.log('Connection closed');
            }
        });
    });
});

module.exports = { client };