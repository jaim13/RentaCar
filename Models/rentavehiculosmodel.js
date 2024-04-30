//rentavehiculosmodel.js
const sql = require('mssql');
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


async function insertarAlquiler(idCliente, vehiculoId, fechaHoy, fechaRenta, seguroRenta, costoTotal) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request
            .input('idCliente', idCliente)
            .input('vehiculoId', vehiculoId)
            .input('fechaHoy', fechaHoy)
            .input('fechaRenta', fechaRenta)
            .input('seguroRenta', seguroRenta)
            .input('costoTotal', costoTotal)
            .execute('InsertAlquiler');
        return result;
    } catch (error) {
        throw new Error('Error al insertar el alquiler en la base de datos: ' + error.message);
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
