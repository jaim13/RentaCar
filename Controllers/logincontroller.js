// logincontroller.js

const loginModel = require('../Models/loginmodel');

async function handleLogin(req, res) {
    try {
        const { cedula, password } = req.body;

        // Verificar si el usuario es un administrador
        if (cedula === '1' && password === '1') {
            // Si es administrador, redirigir a la página de administrador
            return res.redirect('/admin');
        }

        // Si no es administrador, intentar obtener el usuario por cédula y contraseña
        const usuario = await loginModel.obtenerUsuarioPorCedula(cedula, password);

        // Si se encuentra el usuario, redirigir a la página de cliente
        if (usuario) {
            return res.redirect('/Client');
        }

        // Si no se encuentra el usuario o no es administrador, devolver un error de credenciales incorrectas
        return res.status(401).json({ error: 'Credenciales incorrectas' });

    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        // Manejo de errores
        res.status(500).json({ error: 'Ocurrió un error interno en el servidor' });
    }
}

module.exports = {
    handleLogin
};
