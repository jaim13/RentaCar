const db = require('../Models/addcarmodel');
const path = require('path');

async function handleInsertCarData(req, res) {
    try {
        const { ano, puertas, transmision, placas, marca, modelo, tipoVehiculo, color, combustible, costos, Disponibilidad } = req.body;
        console.log('Datos en el cpntroller: ' ,req.body);
        // Aquí obtenemos el nombre del archivo de la imagen
        const imagen = req.file; // Suponiendo que estás utilizando un middleware como Multer para manejar la carga de archivos
        console.log('Imagen: ' ,imagen);
        // Verificamos si se ha cargado una imagen
        if (!imagen) {
            console.log('No llega la imagen al controller. ')
            return res.status(400).json({ success: false, message: 'Debe proporcionar una imagen' });
        }

        // Obtenemos la ruta de la imagen cargada
        const rutaImagen = path.join(__dirname, '..', 'uploads', imagen.filename);

        const AnoID = await db.insertAno(ano);
        const PuertasID = await db.insertPuertas(puertas);
        const TransmisionID = await db.insertTransmision(transmision);
        const PlacasID = await db.insertPlacas(placas);
        const MarcaID = await db.insertMarca(marca);
        const ModeloID = await db.insertModelo(modelo);
        const TipoVehiculoID = await db.insertTipoVehiculo(tipoVehiculo);
        const ColorID = await db.insertColor(color);
        const CombustibleID = await db.insertCombustible(combustible);

        // objeto con los datos del vehículo
        const vehiculo = {
            AnoID,
            PuertasID,
            TransmisionID,
            PlacasID,
            MarcaID,
            ModeloID,
            TipoVehiculoID,
            ColorID,
            CombustibleID,
            Costos: costos,
            Disponible: Disponibilidad,
            RutaImagen: rutaImagen // Agregamos la ruta de la imagen
        };

        console.log('Datos de vehiculo: ', vehiculo);

        const insertExitoso = await db.insertVehiculo(vehiculo);

        if (insertExitoso) {
            res.status(200).json({ success: true, message: 'Datos insertados correctamente' });
        } else {
            console.error('Error al insertar los datos del vehículo');
            res.status(500).json({ success: false, message: 'Error al insertar los datos del vehículo' });
        }
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ error: 'Ocurrió un error interno en el servidor' });
    }
}

module.exports = {
    handleInsertCarData
};
