const sql = require('mssql');

const config = {
    user: 'JaimDavid',
    password: '1234',
    server: 'localhost',
    database: 'RentaCar',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

module.exports = config;
