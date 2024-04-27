// Importa Express.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const helmet = require('helmet');


// SET STORAGE
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
  
  const upload = multer({ storage });

const indexController = require('./Controllers/indexcontroller');
const logincontroller = require('./Controllers/logincontroller');
const addcarcontroller = require('./Controllers/addcarcontroller');
const WatchCarController = require('./Controllers/WatchCarController');
const rentaVehiculosController = require('./Controllers/rentavehiculoscontroller');
const ModifiCarscontroller = require('./Controllers/ModifiCarscontroller');
const TakeBackcontroller = require('./Controllers/CarsBackcontroller');

const app = express();
const router = express.Router();

app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", "http://localhost:4000"], // Permitir carga de fuentes desde el mismo origen y desde http://localhost:4000
      },
    })
  );
// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'Publics')));

// Configurar la directiva 'font-src' en la política de seguridad de contenido
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "font-src 'self' http://localhost:4000");
    next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});
app.get('/Back', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'CarsBack.html'));
});
app.get('/Client', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'client.html'));
});
app.get('/Modi', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'ModifiCars.html'));
});
app.get('/AddCars', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'AddCars.html'));
});
app.get('/WatchCars', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'WatchCars.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'login.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'admin.html'));
});

app.get('/api/vehiculos', WatchCarController.getVehiculos);

// Ruta POST para manejar el registro de usuarios
app.post('/registro-usuario', indexController.handleRegistroUsuario);
app.post('/login-usuario', logincontroller.handleLogin);

app.post('/api/vehiculosmod/:id', async (req, res) => {
    const vehiculoId = req.params.id;
    const { formData } = req.body; // Obtenemos los datos de formData
    const { años, puertas, transmision, marca, modelo, tipoVehiculo, color, combustible, disponible, precio, placas } = formData; // Desestructuramos los datos
    
    try {
        console.log('Datos recibidos en el servidor:', formData);
        console.log('ID del vehiculo recibida en el server: ',vehiculoId)
        await ModifiCarscontroller.handleUpdate({ vehiculoID: vehiculoId, reqBody: formData });
        res.status(200).json({ message: 'Detalles del vehículo actualizados correctamente.' });
    } catch (error) {
        console.error('Error al actualizar los detalles del vehículo:', error);
        res.status(500).json({ error: 'Error al actualizar los detalles del vehículo.' });
    }
});

app.post('/api/devolver-vehiculo', async (req, res) => {
    const vehiculoID = req.body.vehiculoID;

    try {
        await TakeBackcontroller.handleTakeBack(vehiculoID);

        // Si la función handleTakeBack se ejecuta sin errores, enviar una respuesta exitosa
        const response = {
            success: true,
            message: `El vehículo con ID ${vehiculoID} ha sido devuelto exitosamente.`
        };
        res.json(response);
    } catch (error) {
        // Si ocurre un error, enviar una respuesta de error
        console.error('Error al devolver el vehículo:', error);
        res.status(500).json({ success: false, message: 'Se produjo un error al devolver el vehículo.' });
    }
});


app.post('/api/renta_vehiculo', async (req, res) => {
    try {
        const { vehiculoId, formData } = req.body; 
        const { cedula, email, numeroTarjeta, seguroRenta, tipoTarjeta, tiempoRenta } = formData;

        console.log('VehiculoID en el server: ', vehiculoId);
        console.log('FormData en el server: ', formData);

        // Lógica para procesar la renta del vehículo
        await rentaVehiculosController.rentarVehiculo(req, res, vehiculoId, formData);
    } catch (error) {
        console.error('Error al rentar el vehículo:', error);
        res.status(500).json({ error: 'Se produjo un error al rentar el vehículo.' });
    }
});


const fs = require('fs');

app.post('/insert-autos', upload.single('imagen'), (req, res, next) => {
    const imagen = req.file;
    console.log('Imagen: ', imagen);
    
    // Lee el contenido del archivo
    var img = fs.readFileSync(req.file.path);
    
    if (!img) {
        console.log('No se recibió ninguna imagen.');
        const error = new Error('No se recibió ninguna imagen.');
        error.httpStatusCode = 400;
        return next(error);
    }
    
    console.log('Archivo recibido:', req.file);
    
    // Construye la ruta absoluta del archivo
    const imagePath = path.resolve(__dirname, req.file.path);
    next();
}, addcarcontroller.handleInsertCarData);


app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Manejar el error de Multer
        console.log('Error de Multer:', err);
        res.status(400).json({ error: 'Error al cargar el archivo.' });
    } else {
        next(err);
    }
});


const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Accede a tu aplicación en http://localhost:${PORT}`);
});

// Manejo de cierre del servidor
process.on('SIGINT', () => {
    console.log('Servidor apagado.');
    server.close();
});
