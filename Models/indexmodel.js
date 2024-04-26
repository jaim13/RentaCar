// indexmodel.js
const sql = require('mssql');
const sqlConfig = require('../config1.js');

async function insertarCliente(cedula, nombre, apellido, tipoClienteID, lugarResidenciaID, direccion, contraseña) {
    try {
        // Conectarse a la base de datos
        await sql.connect(sqlConfig);

        const query = `
            INSERT INTO Clientes (Ced_Cliente, Nombre, Apellido, TipoClienteID, LugarResidenciaID, Direccion, contrasena)
            VALUES (@cedula, @nombre, @apellido, @tipoClienteID, @lugarResidenciaID, @direccion, @contraseña);
        `;

        const request = new sql.Request();
        request.input('cedula', sql.Int, cedula);
        request.input('nombre', sql.VarChar(100), nombre);
        request.input('apellido', sql.VarChar(100), apellido);
        request.input('tipoClienteID', sql.Int, tipoClienteID);
        request.input('lugarResidenciaID', sql.Int, lugarResidenciaID);
        request.input('direccion', sql.VarChar(255), direccion);
        request.input('contraseña', sql.VarChar(255), contraseña);

        // Ejecutar la consulta
        const result = await request.query(query);

        return result;
    } catch (error) {
        console.error('Error al insertar cliente:', error);
        throw error;
    } finally {
        await sql.close();
    }
}

module.exports = {
    insertarCliente
};
