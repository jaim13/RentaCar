//rentavehiculoscontroller.js
const rentaVehiculosModel = require('../Models/rentavehiculosmodel');
const nodemailer = require('nodemailer');

async function enviarCorreo(cedula, fechaHoy ,fechaRenta, seguroRenta, diferenciaEnDias, CostoF,correo) {
    // Configurar el transporter
    console.log('SeguroRenta:', seguroRenta);
    if (parseInt(seguroRenta) === 1) {
        seguro = "Premiun";
        console.log('Seguro:', seguro);
    } else if (parseInt(seguroRenta) === 2) {
        seguro = "Basic";
        console.log('Seguro:', seguro);
    } else {
        seguro = "Sin seguro";
        console.log('Seguro:', seguro);
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jaimmartinez13@gmail.com', 
            pass: 'envb ycip opre wfbi' 
        }
    });

    // Definir el contenido del correo
    const mailOptions = {
        from: 'jaimmartinez13@gmail.com', 
        to: correo, 
        subject: 'Factura de alquiler de vehículo',
        html: `
            <h2>Factura de alquiler de vehículo</h2>
            <p>Cédula: ${cedula}</p>
            <p>Fecha de hoy: ${fechaHoy}</p>
            <p>Renta hasta la fecha: ${fechaRenta}</p>
            <p>Seguro de renta: ${seguro}</p>
            <p>Diferencia en días: ${diferenciaEnDias}</p>
            <p>Costo final: ${CostoF}</p>
        `
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo electrónico.');
    }
}
function calcularDiferenciaEnDias(fechaInicio, fechaFin) {
    fechaInicio = new Date(fechaInicio);
    console.log('Fecha inicio: ',fechaInicio);
    
    fechaFin = new Date(fechaFin);
    console.log('Fecha fin: ',fechaFin);
    const diferenciaEnMilisegundos = fechaFin - fechaInicio;
    const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    return diferenciaEnDias;
}

function SacarPrecioFinal(costoVehiculo, diferenciaEnDias, seguroRenta) {
    console.log('SeguroRenta:', seguroRenta);
    let seguro = 0;
    if (parseInt(seguroRenta) === 1) {
        seguro = 1000;
        console.log('Seguro:', seguro);
    } else if (parseInt(seguroRenta) === 2) {
        seguro = 500;
        console.log('Seguro:', seguro);
    } else {
        seguro = 0;
        console.log('Seguro:', seguro);
    }
    let costo = costoVehiculo * diferenciaEnDias;
    costo = costo + seguro;
    console.log('Costo:', costo);
    return costo;
}


async function rentarVehiculo(req, res) {
    try {
        console.log('Contenido de req.body en controller: ', req.body);
        const { vehiculoId, formData } = req.body;
        const { cedula, email,numeroTarjeta, fechaRenta, seguroRenta, tipoTarjeta } = formData;
        const tiempoRenta = formData.fechaRenta;
        console.log('Tiempo renta en controller: ', tiempoRenta);
        console.log('Cedula en el controller: ', cedula);
        const idCliente = await rentaVehiculosModel.obtenerIDClientePorCedula(cedula);
        let costoVehiculo = await rentaVehiculosModel.obtenerCostoPorVehiculoID(vehiculoId);
        const fechaHoy = new Date();
        const diferenciaEnDias = calcularDiferenciaEnDias(fechaHoy, tiempoRenta);
        console.log('Diferencia en días:', diferenciaEnDias);
        let CostoF = SacarPrecioFinal(costoVehiculo, diferenciaEnDias,seguroRenta);
        
        await rentaVehiculosModel.insertarAlquiler(idCliente, vehiculoId, fechaHoy, fechaRenta, seguroRenta, CostoF);
        await rentaVehiculosModel.insertarTarjeta(numeroTarjeta, tipoTarjeta);
        await enviarCorreo(cedula,fechaHoy,fechaRenta,seguroRenta,diferenciaEnDias,CostoF,email);
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

