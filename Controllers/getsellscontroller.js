//getsellscontroller.js
const getsellsModel = require('../Models/getsellsmodel');

async function mostrarVentasDelDia(req, res) {
    try {
        console.log('Recibida solicitud para mostrar ventas del día.'); // Agrega un log para verificar si se recibe la solicitud
        const fechaActual = new Date().toISOString().slice(0, 10);
        console.log('Fecha actual:', fechaActual); // Agrega un log para verificar la fecha actual
        const sumaVentas = await getsellsModel.obtenerSumaVentasDelDia(fechaActual);
        console.log('Suma de ventas del día:', sumaVentas); // Agrega un log para verificar la suma de ventas
        res.status(200).json({ success: true, data: sumaVentas });
    } catch (error) {
        console.error('Error al obtener la suma de las ventas del día:', error);
        res.status(500).json({ error: 'Se produjo un error al obtener la suma de las ventas del día.' });
    }
}

module.exports = {
    mostrarVentasDelDia
};
