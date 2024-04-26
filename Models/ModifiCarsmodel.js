//ModifiCarsmodel.js
const db = require('../config'); // Importa el módulo para interactuar con la base de datos

async function obtenerIdsRelacionadas(vehiculoId) {
    try {
        const queryString = `SELECT TipoVehiculoID, ColorID, CombustibleID, TransmisionID, PlacasID, ModeloID, MarcaID, AnoID, PuertasID FROM Vehiculos WHERE VehiculoID = '${vehiculoId}'`;
        const result = await db.query(queryString);
        if (result.length > 0) {
            const idsRelacionadas = {
                TipoVehiculoID: result[0].TipoVehiculoID,
                ColorID: result[0].ColorID,
                CombustibleID: result[0].CombustibleID,
                TransmisionID: result[0].TransmisionID,
                PlacasID: result[0].PlacasID,
                ModeloID: result[0].ModeloID,
                MarcaID: result[0].MarcaID,
                AnoID: result[0].AnoID,
                PuertasID: result[0].PuertasID
            };
            return idsRelacionadas;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener IDs relacionadas:', error);
        throw error; // Relanza el error para que el controlador pueda manejarlo
    }
}


async function actualizarTipoVehiculo(tipoVehiculoID, nuevoTipo) {
    try {
        const query = `UPDATE TipoVehiculo SET Tipo = @NuevoTipo WHERE TipoVehiculoID = @TipoVehiculoID`;
        const result = await db.query(query, {
            NuevoTipo: nuevoTipo,
            TipoVehiculoID: tipoVehiculoID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el tipo de vehículo:', error);
    }
}

async function actualizarColor(colorID, nuevoColor) {
    try {
        const query = `UPDATE Color SET Color = @NuevoColor WHERE ColorID = @ColorID`;
        const result = await db.query(query, {
            NuevoColor: nuevoColor,
            ColorID: colorID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el color:', error);
    }
}

async function actualizarCombustible(CombustibleID, Tipo) {
    try {
        const query = `UPDATE Combustible SET Tipo = @Tipo WHERE CombustibleID = @CombustibleID`;
        const result = await db.query(query, {
            Tipo: Tipo,
            CombustibleID: CombustibleID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el color:', error);
    }
}

async function actualizarTransmision(TransmisionID, Nombre) {
    try {
        const query = `UPDATE Transimision SET Nombre = @Nombre WHERE TransmisionID = @TransmisionID`;
        const result = await db.query(query, {
            Nombre: Nombre,
            TransmisionID: TransmisionID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el color:', error);
    }
}

async function actualizarPlacas(PlacasID, Numero) {
    try {
        const query = `UPDATE Placas SET Numero = @Numero WHERE PlacasID = @PlacasID`;
        const result = await db.query(query, {
            Numero: Numero,
            PlacasID: PlacasID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el color:', error);
    }
}

async function actualizarModelo(ModeloID, Nombre) {
    try {
        const query = `UPDATE Modelo SET Nombre = @Nombre WHERE ModeloID = @ModeloID`;
        const result = await db.query(query, {
            Nombre: Nombre,
            ModeloID: ModeloID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el color:', error);
    }
}

async function actualizarMarca(MarcaID, Nombre) {
    try {
        const query = `UPDATE Marca SET Nombre = @Nombre WHERE MarcaID = @MarcaID`;
        const result = await db.query(query, {
            Nombre: Nombre,
            MarcaID: MarcaID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el color:', error);
    }
}

async function actualizarAno(AnoID, Anos) {
    try {
        const query = `UPDATE Anos SET Anos = @Anos WHERE AnoID = @AnoID`;
        const result = await db.query(query, {
            Anos: Anos,
            AnoID: AnoID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el color:', error);
    }
}

async function actualizarPuertas(PuertasID, Puertas) {
    try {
        const query = `UPDATE Puertas SET Puertas = @Puertas WHERE PuertasID = @PuertasID`;
        const result = await db.query(query, {
            Puertas: Puertas,
            PuertasID: PuertasID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar el color:', error);
    }
}

async function actualizarCostosYDisponibilidad(vehiculoID, nuevosCostos, nuevaDisponibilidad) {
    try {
        console.log('Disponibilidad del vehiculo: ',nuevaDisponibilidad);
        var disponible;
        if (nuevaDisponibilidad === true) {
            disponible = 'Si';
        } else {
            disponible = 'No';
        }
        const query = `
            UPDATE Vehiculos 
            SET Costos = @NuevosCostos, Disponible = @disponible 
            WHERE VehiculoID = @VehiculoID
        `;
        const result = await db.query(query, {
            NuevosCostos: nuevosCostos,
            disponible: disponible,
            VehiculoID: vehiculoID
        });

        return result;
    } catch (error) {
        throw new Error('Error al actualizar los costos y la disponibilidad:', error);
    }
}

module.exports = {
    obtenerIdsRelacionadas,
    actualizarTipoVehiculo,
    actualizarColor,
    actualizarCombustible,
    actualizarTransmision,
    actualizarPlacas,
    actualizarModelo,
    actualizarMarca,
    actualizarAno,
    actualizarPuertas,
    actualizarCostosYDisponibilidad
};
