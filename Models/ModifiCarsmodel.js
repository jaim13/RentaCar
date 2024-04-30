//ModifiCarsmodel.js
const db = require('../config'); // Importa el módulo para interactuar con la base de datos
const sql = require('mssql');
const sqlConfig = require('../config1');


async function obtenerIdsRelacionadas(vehiculoId) {
    try {
        const queryString = `SELECT TipoVehiculoID, ColorID, CombustibleID, TransmisionID, PlacasID, ModeloID, MarcaID, AnoID, PuertasID FROM Vehiculos WHERE VehiculoID = '${vehiculoId}'`;
        const result = await db.query(queryString);
        console.log('Resultado de la consulta obtenerIdsRelacionadas:', result); // Agregado para verificar el resultado de la consulta
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
        console.log('Resultado de la actualización actualizarTipoVehiculo:', result); // Agregado para verificar el resultado de la actualización
        return result;
    } catch (error) {
        throw new Error('Error al actualizar el tipo de vehículo:', error);
    }
}

async function actualizarCombustible(CombustibleID, Tipo) {
    try {
        console.log('Id combustible en el model: ',CombustibleID);
        console.log('Tipo en el model combustible: ',Tipo);
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
        console.log('Disponibilidad del vehiculo: ', nuevaDisponibilidad);
        var disponible;
        if (nuevaDisponibilidad === true) {
            disponible = 'Si';
        } else {
            disponible = 'No';
        }
        console.log('Valor de disponible: ', disponible); // Agregado para verificar el valor de disponible
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
        console.log('Resultado de la actualización: ', result); // Agregado para verificar el resultado de la actualización
        return result;
    } catch (error) {
        throw new Error('Error al actualizar los costos y la disponibilidad:', error);
    }
}

async function eliminarRegistroPorAlquilerID(AlquilerID) {
    try {
        const query = `DELETE FROM Alquileres WHERE AlquilerID = @AlquilerID`; 
        const result = await db.query(query, { AlquilerID });

        if (result && result.rowsAffected && result.rowsAffected[0] === 1) {
            return true; // Indica que el registro fue eliminado correctamente
        } else if (result && result.rowsAffected && result.rowsAffected[0] === 0) {
            return false; // Indica que el registro no existe
        } else {
            return false; // En caso de otros errores
        }
    } catch (error) {
        console.error('Error al eliminar el registro por AlquilerID:', error);
        throw error;
    }
}

async function obtenerAlquilerIDPorVehiculoID(VehiculoID) {
    try {
        const query = `SELECT AlquilerID FROM Alquileres WHERE VehiculoID = @VehiculoID`;
        const result = await db.query(query, { VehiculoID });

        if (result.length > 0) {
            return result[0].AlquilerID;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener la AlquilerID por VehiculoID:', error);
        throw error;
    }
}

async function eliminarVehiculoPorId(VehiculoID) {
    try {
        console.log('Intentando eliminar vehículo con ID:', VehiculoID);

        await sql.connect(sqlConfig);

        const result = await sql.query`
            DELETE FROM Vehiculos
            WHERE VehiculoID = ${VehiculoID}
        `;

        if (result.rowsAffected[0] === 1) {
            return true; // Indica que el vehículo fue eliminado correctamente
        } else {
            return false; // Indica que el vehículo no existe
        }
    } catch (error) {
        throw new Error(`Error al eliminar el vehículo: ${error.message}`);
    } finally {
        await sql.close();
    }
}
async function eliminarCarPorId(VehiculoID) {
    try {
        let AlquilerID = await obtenerAlquilerIDPorVehiculoID(VehiculoID);
        
        if (AlquilerID) {
            let resultAlquiler = await eliminarRegistroPorAlquilerID(AlquilerID);
            console.log('Registro de alquiler eliminado correctamente');
            
            if (resultAlquiler) {
                let resultVehiculo = await eliminarVehiculoPorId(VehiculoID);
                if (resultVehiculo) {
                    return 'El vehículo fue eliminado con éxito';
                } else {
                    console.log('No se pudo eliminar el vehículo');
                    return null;
                }
            } else {
                console.log('No se pudo eliminar el registro de alquiler');
                return null;
            }
        } else {
            console.log('No hay registro de alquiler asociado al vehículo');
            let resultVehiculo = await eliminarVehiculoPorId(VehiculoID);
            if (resultVehiculo) {
                return 'El vehículo fue eliminado con éxito';
            } else {
                console.log('No se pudo eliminar el vehículo');
                return null;
            }
        }
    } catch (error) {
        console.error(`Error al eliminar el vehículo: ${error.message}`);
        return null;
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
    actualizarCostosYDisponibilidad,
    eliminarCarPorId
};
