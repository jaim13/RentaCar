// usermodicontroller.js
const userModel = require('../Models/usermodimodel');

const actualizarCliente = async (req, res) => {
    const { usuarioId, formData: { cedula, nombre, apellido, tipoCliente, lugarResidencia, direccion, contrasena } } = req.body;
    try {
        console.log('Usuario con la id en el controller: ',usuarioId);
        console.log('Datos para actualizar en el controller: ', cedula, nombre, apellido, tipoCliente, lugarResidencia, direccion, contrasena);
        const result = await userModel.actualizarUsuario(usuarioId, cedula, nombre, apellido, tipoCliente, lugarResidencia, direccion, contrasena);
        return result;
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        return error
    }
};
const eliminarClientePorId = async (id) => { 
    console.log('Id a eliminar en controller: ', id);
    try {
        const result = await userModel.eliminarUsuarioPorId(id);
        return result;
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        return error;
    }
};

module.exports = { actualizarCliente, eliminarClientePorId };