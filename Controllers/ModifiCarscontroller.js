//ModifiCarscontroller.js
const express = require('express');
const router = express.Router();
const ModifiCarsModel = require('../Models/ModifiCarsmodel'); // Importa el modelo

// Función para manejar la solicitud POST para actualizar un vehículo
async function handleUpdate(reqBody) {
    const { vehiculoId, nuevoColorId, nuevosCostos, nuevaDisponibilidad, nuevasPlacas } = reqBody;

    try {
        // Actualiza el color del vehículo
        await ModifiCarsModel.updateColor(vehiculoId, nuevoColorId);

        // Actualiza los costos del vehículo
        await ModifiCarsModel.updateCostos(vehiculoId, nuevosCostos);

        // Actualiza la disponibilidad del vehículo
        await ModifiCarsModel.updateDisponibilidad(vehiculoId, nuevaDisponibilidad);

        // Actualiza las placas del vehículo
        await ModifiCarsModel.updatePlacas(vehiculoId, nuevasPlacas);

        // Retorna un mensaje de éxito si todas las actualizaciones fueron exitosas
        return 'Actualización exitosa.';
    } catch (error) {
        console.error('Error al actualizar el vehículo:', error);
        throw new Error('Error al actualizar el vehículo.');
    }
}

module.exports = handleUpdate;

