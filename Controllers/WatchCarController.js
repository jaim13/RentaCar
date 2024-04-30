//WatchCarController.js
const WatchCarModel = require('../Models/WatchCarModel');

module.exports = {
    getVehiculos: async function (req, res) {
        try {
            // Llama a la función del modelo para obtener los vehículos
            const vehiculos = await WatchCarModel.obtenerVehiculos();
            //console.log('Vehiculos en el controller: ', vehiculos);
            // Envía los vehículos al cliente como respuesta
            res.status(200).json({ success: true, data: vehiculos });
        } catch (error) {
            console.error('Error al obtener los vehículos:', error);
            res.status(500).json({ success: false, message: 'Error al obtener los vehículos' });
        }
    }
};
