//rentavehiculosmodel.js

const { poolPromise } = require('../config');

async function obtenerCostoPorVehiculoID(vehiculoID) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request
            .input('VehiculoID', vehiculoID)
            .query('SELECT Costos FROM Vehiculos WHERE VehiculoID = @VehiculoID');
        
        if (result.recordset.length > 0) {
            return result.recordset[0].Costos;
        } else {
            throw new Error('No se encontró ningún vehículo con ese ID');
        }
    } catch (error) {
        throw new Error(`Error al obtener el costo del vehículo: ${error.message}`);
    }
}
async function obtenerIDClientePorCedula(cedula) {
    try {
        console.log('Cedula en el model: ',cedula);
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request
            .input('Cedula', cedula)
            .query('SELECT ID_Cliente FROM Clientes WHERE Ced_Cliente = @Cedula');
        
        if (result.recordset.length > 0) {
            return result.recordset[0].ID_Cliente;
        } else {
            throw new Error('No se encontró ningún cliente con esa cédula');
        }
    } catch (error) {
        throw new Error(`Error al obtener el ID del cliente: ${error.message}`);
    }
}


async function insertarAlquiler(ID_Cliente, VehiculoID, FechaInicio, FechaFin, ID_Seguro, MontoTotal) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request
            .input('ID_Cliente', ID_Cliente)
            .input('VehiculoID', VehiculoID)
            .input('FechaInicio', FechaInicio)
            .input('FechaFin', FechaFin)
            .input('ID_Seguro', ID_Seguro)
            .input('MontoTotal', MontoTotal)
            .execute('InsertarAlquiler');
        return result;
    } catch (error) {
        throw new Error(`Error al insertar alquiler: ${error.message}`);
    }
}

async function insertarTarjeta(Numero, TipoTarjetaID) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request
            .input('Numero', Numero)
            .input('TipoTarjetaID', TipoTarjetaID)
            .execute('InsertarTarjeta');
        return result;
    } catch (error) {
        throw new Error(`Error al insertar tarjeta: ${error.message}`);
    }
}

async function actualizarDisponibilidadVehiculo(VehiculoID) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request
            .input('VehiculoID', VehiculoID)
            .execute('ActualizarDisponibilidadVehiculo');
        return result;
    } catch (error) {
        throw new Error(`Error al actualizar disponibilidad del vehículo: ${error.message}`);
    }
}

module.exports = {
    insertarAlquiler,
    insertarTarjeta,
    actualizarDisponibilidadVehiculo,
    obtenerCostoPorVehiculoID,
    obtenerIDClientePorCedula
};
