//ModifiCarsmodel.js
const db = require('../config'); // Importa el módulo para interactuar con la base de datos

async function updatePlacas(vehiculoId, nuevasPlacas) {
    try {
        await db.query('UPDATE Placas SET Numero = ? WHERE PlacasID = (SELECT PlacasID FROM Vehiculos WHERE VehiculoID = ?)', [nuevasPlacas, vehiculoId]);
        return true; // Indica que la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar las placas del vehículo:', error);
        return false; // Indica que ocurrió un error durante la actualización
    }
}

// Función para actualizar la ruta de la imagen de un vehículo
async function updateRutaImagen(vehiculoId, nuevaRutaImagen) {
    try {
        await db.query('UPDATE Vehiculos SET ruta_imagen = ? WHERE VehiculoID = ?', [nuevaRutaImagen, vehiculoId]);
        return true; // Indica que la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar la ruta de la imagen del vehículo:', error);
        return false; // Indica que ocurrió un error durante la actualización
    }
}
async function updateColor(vehiculoId, nuevoColor) {
    try {
        await db.query('UPDATE Color SET Color = ? WHERE ColorID = (SELECT ColorID FROM Vehiculos WHERE VehiculoID = ?)', [nuevoColor, vehiculoId]);
        return true; // Indica que la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar el color del vehículo:', error);
        return false; // Indica que ocurrió un error durante la actualización
    }
}
// Función para actualizar el costo de un vehículo
async function updateCostos(vehiculoId, nuevosCostos) {
    try {
        await db.query('UPDATE Vehiculos SET Costos = ? WHERE VehiculoID = ?', [nuevosCostos, vehiculoId]);
        return true; // Indica que la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar los costos del vehículo:', error);
        return false; // Indica que ocurrió un error durante la actualización
    }
}

// Función para actualizar la disponibilidad de un vehículo
async function updateDisponible(vehiculoId, nuevaDisponibilidad) {
    try {
        await db.query('UPDATE Vehiculos SET Disponible = ? WHERE VehiculoID = ?', [nuevaDisponibilidad, vehiculoId]);
        return true; // Indica que la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar la disponibilidad del vehículo:', error);
        return false; // Indica que ocurrió un error durante la actualización
    }
}


module.exports = {
    updateColor,
    updateCostos,
    updateDisponible,
    updatePlacas,
    updateRutaImagen
};
