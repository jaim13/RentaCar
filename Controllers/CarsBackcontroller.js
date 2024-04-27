//CarsBackcontroller.js
const TakeBackModel = require('../Models/CarsBackmodel');

async function handleTakeBack(vehiculoID) {
    try {
        // Llamar a la función correspondiente en el modelo para manejar la devolución del vehículo
        await TakeBackModel.ActualizarDisponibilidad(vehiculoID);
        console.log(`El vehículo con ID ${vehiculoID} ha sido devuelto exitosamente.`);
    } catch (error) {
        console.error('Error al devolver el vehículo:', error);
        throw new Error('Error al devolver el vehículo.');
    }
}

// Exportar la función para que esté disponible para otros módulos
module.exports = {
    handleTakeBack: handleTakeBack
};