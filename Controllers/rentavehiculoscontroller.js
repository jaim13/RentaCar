//rentavehiculoscontroller.js
const rentaVehiculosModel = require('../Models/rentavehiculosmodel');

function calcularDiferenciaEnDias(fechaInicio, fechaFin) {
    fechaInicio = new Date(fechaInicio);
    console.log('Fecha inicio: ',fechaInicio);
    
    fechaFin = new Date(fechaFin);
    console.log('Fecha fin: ',fechaFin);
    const diferenciaEnMilisegundos = fechaFin - fechaInicio;
    const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    return diferenciaEnDias;
}

function SacarPrecioFinal(costoVehiculo, diferenciaEnDias) {
    return costoVehiculo * diferenciaEnDias;
}

async function rentarVehiculo(req, res) {
    try {
        console.log('Contenido de req.body en controller: ', req.body);
        const { vehiculoId, formData } = req.body;
        const { cedula, numeroTarjeta, fechaRenta, seguroRenta, tipoTarjeta } = formData;
        const tiempoRenta = formData.fechaRenta;
        console.log('Tiempo renta en controller: ', tiempoRenta);
        console.log('Cedula en el controller: ', cedula);
        
        const idCliente = await rentaVehiculosModel.obtenerIDClientePorCedula(cedula);
        let costoVehiculo = await rentaVehiculosModel.obtenerCostoPorVehiculoID(vehiculoId);
        const fechaHoy = new Date();
        const diferenciaEnDias = calcularDiferenciaEnDias(fechaHoy, tiempoRenta);
        console.log('Diferencia en días:', diferenciaEnDias);
        let CostoF = SacarPrecioFinal(costoVehiculo, diferenciaEnDias);
        
        await rentaVehiculosModel.insertarAlquiler(idCliente, vehiculoId, fechaHoy, fechaRenta, seguroRenta, CostoF);
        await rentaVehiculosModel.insertarTarjeta(numeroTarjeta, tipoTarjeta);
        await rentaVehiculosModel.actualizarDisponibilidadVehiculo(vehiculoId);
        
        res.status(200).json({ message: 'El vehículo ha sido rentado con éxito.' });
    } catch (error) {
        // Manejar errores
        console.error('Error al rentar el vehículo:', error);
        res.status(500).json({ error: 'Se produjo un error al rentar el vehículo.' });
    }
}


module.exports = {
    rentarVehiculo: rentarVehiculo
};

