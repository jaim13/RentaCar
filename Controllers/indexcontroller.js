// indexcontroller.js
const Usuario = require('../Models/indexmodel');

// Función para manejar el registro de usuarios
async function handleRegistroUsuario(req, res) {
    try {
        const { cedula, nombre, apellido, contraseña, tipoCliente, lugarResidencia, direccion } = req.body;
        console.log('Datos recibidos del formulario:', req.body);
        const nuevoUsuario = await Usuario.insertarCliente(cedula, nombre, apellido, tipoCliente, lugarResidencia, direccion, contraseña);

       // Redirige al usuario a la página de inicio de sesión (/login)
        res.redirect('/login');
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ error: 'Ocurrió un error interno en el servidor' });
    }
}

module.exports = {
    handleRegistroUsuario
};
