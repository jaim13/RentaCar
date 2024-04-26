//ModifiCarscontroller.js
const express = require('express');
const ModifiCarsModel = require('../Models/ModifiCarsmodel'); // Importa el modelo

// Función para manejar la solicitud POST para actualizar un vehículo
async function handleUpdate({ vehiculoID, reqBody }) {
    console.log('Id del vehiculo en el controller: ',vehiculoID);
    console.log('Datos recibidos en handleUpdate:', reqBody);
    const {
        años,
        puertas,
        transmision,
        marca,
        modelo,
        tipoVehiculo,
        color,
        combustible,
        disponible,
        precio,
        placas
    } = reqBody;

    try {
        const idsRelacionadas = await ModifiCarsModel.obtenerIdsRelacionadas(vehiculoID);
        
        if (idsRelacionadas) {
            const {
                TipoVehiculoID,
                ColorID,
                CombustibleID,
                TransmisionID,
                PlacasID,
                ModeloID,
                MarcaID,
                AnoID,
                PuertasID
            } = idsRelacionadas;
            
            console.log('TipoVehiculoID:', TipoVehiculoID);
            resultTipo = await ModifiCarsModel.actualizarTipoVehiculo(TipoVehiculoID, tipoVehiculo);
            
            console.log('ColorID:', ColorID);
            resultColor = await ModifiCarsModel.actualizarColor(ColorID, color);
            
            console.log('CombustibleID:', CombustibleID);
            resultCombustible = await ModifiCarsModel.actualizarCombustible(CombustibleID, combustible);
            
            console.log('TransmisionID:', TransmisionID);
            resultTransmision = await ModifiCarsModel.actualizarTransmision(TransmisionID, transmision);
            
            console.log('PlacasID:', PlacasID);
            resultPlacas = await ModifiCarsModel.actualizarPlacas(PlacasID, placas);
            
            console.log('ModeloID:', ModeloID);
            resultModelo = await ModifiCarsModel.actualizarModelo(ModeloID, modelo);
            
            console.log('MarcaID:', MarcaID);
            resultMarca = await ModifiCarsModel.actualizarMarca(MarcaID, marca);
            
            console.log('AnoID:', AnoID);
            resultAnos = await ModifiCarsModel.actualizarAno(AnoID, años);
            
            console.log('PuertasID:', PuertasID);
            resultPuertas = await ModifiCarsModel.actualizarPuertas(PuertasID, puertas);
            
            resultCostosDispo = await ModifiCarsModel.actualizarCostosYDisponibilidad(vehiculoID, precio, disponible);

            return 'Actualización exitosa.';
        } else {
            console.error('No se encontraron IDs relacionadas para el VehiculoID proporcionado.');
            throw new Error('No se encontraron IDs relacionadas para el VehiculoID proporcionado.');
        }
    } catch (error) {
        console.error('Error al actualizar el vehículo:', error);
        throw new Error('Error al actualizar el vehículo.');
    }
}


module.exports = {
    handleUpdate: handleUpdate
};

