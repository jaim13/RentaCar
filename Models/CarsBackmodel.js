//CarsBackmodel.js
const sql = require('mssql');
const sqlConfig = require('../config1.js');

async function ActualizarDisponibilidad(vehiculoID) {
    try {
        await sql.connect(sqlConfig);

        const Disponible = 'Si';
        const request = new sql.Request();
        const query = `UPDATE Vehiculos SET Disponible = @Disponible WHERE VehiculoID = @VehiculoID`;

        // Ejecutar la consulta SQL con los parámetros proporcionados
        const result = await request
            .input('Disponible', sql.VarChar, Disponible)
            .input('VehiculoID', sql.Int, vehiculoID)
            .query(query);

        return result;
    } catch (error) {
        throw new Error('Error al actualizar la disponibilidad: ' + error.message);
    } finally {
        sql.close(); // Cerrar la conexión a la base de datos
    }
}

module.exports = {
    ActualizarDisponibilidad
};
