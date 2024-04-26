//addcarmodel.js
// Importa el módulo de base de datos
const sql = require('mssql');
const db = require('../config');

async function insertAno(ano) {
    try {
        console.log("Valor recibido para insertar en Anos:", ano);
        const query = 'EXEC InsertarAno @Ano';
        const result = await db.query(query, { Ano: ano });

        if (result && result[0] && result[0].AnoID) {
            return result[0].AnoID;
        } else {
            console.error("No se pudo obtener el ID del año insertado:", result);
            throw new Error("No se pudo obtener el ID del año insertado");
        }
    } catch (error) {
        console.error(`Error al insertar el año en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar el año en la base de datos: ${error.message}`);
    }
}

async function insertPuertas(puertas) {
    try {
        const query = 'EXEC InsertarPuertas @Puertas';
        const result = await db.query(query, { Puertas: puertas });

        if (result && result[0] && result[0].PuertasID) {
            return result[0].PuertasID;
        } else {
            console.error("No se pudo obtener el ID del número de puertas insertado:", result);
            throw new Error("No se pudo obtener el ID del número de puertas insertado");
        }
    } catch (error) {
        console.error(`Error al insertar el número de puertas en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar el número de puertas en la base de datos: ${error.message}`);
    }
}

async function insertTransmision(transmision) {
    try {
        const query = 'EXEC InsertarTransimision @Nombre';
        const result = await db.query(query, { Nombre: transmision });

        if (result && result[0] && result[0].TransmisionID) {
            return result[0].TransmisionID;
        } else {
            console.error("No se pudo obtener el ID de la transmisión insertada:", result);
            throw new Error("No se pudo obtener el ID de la transmisión insertada");
        }
    } catch (error) {
        console.error(`Error al insertar la transmisión en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar la transmisión en la base de datos: ${error.message}`);
    }
}

async function insertPlacas(numero) {
    try {
        const query = 'EXEC InsertarPlacas @Numero';
        const result = await db.query(query, { Numero: numero });

        if (result && result[0] && result[0].PlacasID) {
            return result[0].PlacasID;
        } else {
            console.error("No se pudo obtener el ID del número de placa insertado:", result);
            throw new Error("No se pudo obtener el ID del número de placa insertado");
        }
    } catch (error) {
        console.error(`Error al insertar el número de placa en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar el número de placa en la base de datos: ${error.message}`);
    }
}

async function insertMarca(nombre) {
    try {
        const query = 'EXEC InsertarMarca @Nombre';
        const result = await db.query(query, { Nombre: nombre });

        if (result && result[0] && result[0].MarcaID) {
            return result[0].MarcaID;
        } else {
            console.error("No se pudo obtener el ID de la marca insertada:", result);
            throw new Error("No se pudo obtener el ID de la marca insertada");
        }
    } catch (error) {
        console.error(`Error al insertar la marca en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar la marca en la base de datos: ${error.message}`);
    }
}

async function insertModelo(nombre) {
    try {
        const query = 'EXEC InsertarModelo @Nombre';
        const result = await db.query(query, { Nombre: nombre });

        if (result && result[0] && result[0].ModeloID) {
            return result[0].ModeloID;
        } else {
            console.error("No se pudo obtener el ID del modelo insertado:", result);
            throw new Error("No se pudo obtener el ID del modelo insertado");
        }
    } catch (error) {
        console.error(`Error al insertar el modelo en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar el modelo en la base de datos: ${error.message}`);
    }
}

async function insertTipoVehiculo(tipo) {
    try {
        console.log('Tipo de vehiculo: ',tipo);
        const query = 'EXEC InsertarTipoVehiculo @Tipo';
        const result = await db.query(query, { Tipo: tipo });

        if (result && result[0] && result[0].TipoVehiculoID) {
            return result[0].TipoVehiculoID;
        } else {
            console.error("No se pudo obtener el ID del tipo de vehículo insertado:", result);
            throw new Error("No se pudo obtener el ID del tipo de vehículo insertado");
        }
    } catch (error) {
        console.error(`Error al insertar el tipo de vehículo en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar el tipo de vehículo en la base de datos: ${error.message}`);
    }
}

async function insertColor(color) {
    try {
        const query = 'EXEC InsertarColor @Color';
        const result = await db.query(query, { Color: color });

        if (result && result[0] && result[0].ColorID) {
            return result[0].ColorID;
        } else {
            console.error("No se pudo obtener el ID del color insertado:", result);
            throw new Error("No se pudo obtener el ID del color insertado");
        }
    } catch (error) {
        console.error(`Error al insertar el color en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar el color en la base de datos: ${error.message}`);
    }
}

async function insertCombustible(tipo) {
    try {
        const query = 'EXEC InsertarCombustible @Tipo';
        const result = await db.query(query, { Tipo: tipo });

        if (result && result[0] && result[0].CombustibleID) {
            return result[0].CombustibleID;
        } else {
            console.error("No se pudo obtener el ID del tipo de combustible insertado:", result);
            throw new Error("No se pudo obtener el ID del tipo de combustible insertado");
        }
    } catch (error) {
        console.error(`Error al insertar el tipo de combustible en la base de datos: ${error.message}`);
        throw new Error(`Error al insertar el tipo de combustible en la base de datos: ${error.message}`);
    }
}

// Función para insertar un vehículo en la tabla Vehiculos y devolver un booleano indicando si se realizó correctamente
async function insertVehiculo(vehiculo) {
    try {
        const query = 'EXEC InsertarVehiculoConImagen @TipoVehiculoID, @ColorID, @CombustibleID, @TransmisionID, @PlacasID, @ModeloID, @MarcaID, @AnoID, @PuertasID, @Costos, @Disponible, @RutaImagen';
        const values = {
            TipoVehiculoID: vehiculo.TipoVehiculoID,
            ColorID: vehiculo.ColorID,
            CombustibleID: vehiculo.CombustibleID,
            TransmisionID: vehiculo.TransmisionID,
            PlacasID: vehiculo.PlacasID,
            ModeloID: vehiculo.ModeloID,
            MarcaID: vehiculo.MarcaID,
            AnoID: vehiculo.AnoID,
            PuertasID: vehiculo.PuertasID,
            Costos: vehiculo.Costos.toString(), // Convertir a texto si es necesario
            Disponible: vehiculo.Disponible.toString(), // Convertir a texto si es necesario
            RutaImagen: vehiculo.RutaImagen // Agregar la ruta de la imagen
        };

        await db.query(query, values);
        return true; 
    } catch (error) {
        console.error(`Error al insertar el vehículo en la base de datos: ${error.message}`);
        return false; 
    }
}

module.exports = {
    insertAno,
    insertPuertas,
    insertTransmision,
    insertModelo,
    insertColor,
    insertTipoVehiculo,
    insertMarca,
    insertPlacas,
    insertCombustible,
    insertVehiculo
};
