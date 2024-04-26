//WatchCarModel.js
const sql = require('mssql');
const db = require('../config');

async function obtenerVehiculos() {
    try {
        const pool = await db.poolPromise;
        const request = pool.request();
        // Ejecutar el procedimiento almacenado
        const result = await request.execute('GetVehiculos');
        return result.recordset;
    } catch (error) {
        throw new Error(`Error al obtener los vehículos: ${error.message}`);
    }
}

module.exports = {
    obtenerVehiculos: obtenerVehiculos
};
