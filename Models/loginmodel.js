// loginmodel.js
const sql = require('mssql');
const sqlConfig = require('../config1');

async function obtenerUsuarioPorCedula(cedula, contraseña) {
    try {
        console.log('Cedula y contra: ', cedula,contraseña);
        await sql.connect(sqlConfig);

        const result = await sql.query`SELECT * FROM Clientes WHERE Ced_Cliente = ${cedula}`;

        if (result.recordset.length > 0) {
            const usuario = result.recordset[0];
            
            if (usuario.contrasena === contraseña) {
                return usuario; 
            } else {
                return null; 
            }
        } else {
            return null;
        }
    } catch (error) {
        // Manejo de errores
        throw new Error(`Error al obtener el usuario por cédula: ${error.message}`);
    } finally {
        await sql.close();
    }
}

async function obtenerUsuarioAdmin(cedula, contraseña) {
    try {
        console.log('Cedula y contra si es Admin: ', cedula,contraseña);
        await sql.connect(sqlConfig);

        const result = await sql.query`SELECT * FROM Clientes WHERE Ced_Cliente = ${cedula}`;

        if (result.recordset.length > 0) {
            const usuario = result.recordset[0];
            
            if (usuario.contrasena === contraseña) {
                const usuarioConId5 = { ...usuario, idEs5: usuario.ID_Cliente === 5 };
                return usuarioConId5; 
            } else {
                return null; 
            }
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(`Error al obtener el usuario por cédula: ${error.message}`);
    } finally {
        await sql.close();
    }
}


module.exports = {
    obtenerUsuarioPorCedula,
    obtenerUsuarioAdmin
};
