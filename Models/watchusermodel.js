//watchusermodel.js
const sql = require('mssql');
const db = require('../config');

async function obtenerclientes() {
    try {
        const pool = await db.poolPromise;
        const request = pool.request();
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('WatchUsers');
        return result.recordset;
    } catch (error) {
        throw new Error(`Error al obtener los vehículos: ${error.message}`);
    }
}

module.exports = {
    obtenerclientes
};
