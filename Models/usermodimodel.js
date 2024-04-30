//usermodimodel.js
const sql = require('mssql');
const sqlConfig = require('../config1'); // Importa la configuración de la base de datos

async function actualizarUsuario(ID_Cliente, Ced_Cliente, Nombre, Apellido, TipoClienteID, LugarResidenciaID, Direccion, contrasena) {
    try {
        console.log('Datos recibidos para actualizar:', { ID_Cliente, Ced_Cliente, Nombre, Apellido, TipoClienteID, LugarResidenciaID, Direccion, contrasena });

        await sql.connect(sqlConfig);

        const result = await sql.query`
            UPDATE Clientes 
            SET 
                Ced_Cliente = ${Ced_Cliente},
                Nombre = ${Nombre},
                Apellido = ${Apellido},
                TipoClienteID = ${TipoClienteID},
                LugarResidenciaID = ${LugarResidenciaID},
                Direccion = ${Direccion},
                contrasena = ${contrasena}
            WHERE ID_Cliente = ${ID_Cliente}
        `;

        return result.rowsAffected[0] === 1;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario: ${error.message}`);
    } finally {
        await sql.close();
    }
}

async function eliminarUsuarioPorId(ID_Cliente) {
    try {
        console.log('Intentando eliminar usuario con ID:', ID_Cliente);
        
        await sql.connect(sqlConfig);

        const result = await sql.query`
            DELETE FROM Clientes
            WHERE ID_Cliente = ${ID_Cliente}
        `;

        if (result.rowsAffected[0] === 1) {
            return 'El usuario fue eliminado con éxito';
        } else {
            throw new Error('No se pudo eliminar el usuario');
        }
    } catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    } finally {
        await sql.close();
    }
}

module.exports = { actualizarUsuario,eliminarUsuarioPorId};


