//getsellsmodel.js

const { poolPromise } = require('../config');

async function obtenerSumaVentasDelDia(fecha) {
    try {
        console.log('Obteniendo suma de ventas del día para la fecha:', fecha); 
        const pool = await poolPromise;
        const request = pool.request();
        const query = `
        SELECT SUM(MontoTotal) AS SumaMontoTotal
        FROM Alquileres
        WHERE CONVERT(date, FechaInicio) = @fecha
        `;
        const result = await request.input('fecha', fecha).query(query);
        console.log('Resultado de la consulta:', result.recordset[0]);
        return result.recordset[0].SumaMontoTotal || 0;
    } catch (error) {
        console.error(`Error al obtener la suma de las ventas del día: ${error.message}`);
        throw new Error(`Error al obtener la suma de las ventas del día: ${error.message}`);
    }
}

module.exports = {
    obtenerSumaVentasDelDia
};
