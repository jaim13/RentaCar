//watchusercontroller.js

const userModel = require('../Models/watchusermodel');

module.exports = {
    getUser: async function (req, res) {
        try {
            // Llama a la función del modelo para obtener los vehículos
            const user = await userModel.obtenerclientes();
            console.log('Vehiculos en el controller: ', user);
            // Envía los vehículos al cliente como respuesta
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            console.error('Error al obtener los vehículos:', error);
            res.status(500).json({ success: false, message: 'Error al obtener los vehículos' });
        }
    }
};
