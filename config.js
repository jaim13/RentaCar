const sql = require('mssql');

const config = {
    user: 'JaimDavid',
    password: '1234',
    server: 'localhost',
    database: 'RentaCar',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conexión a la base de datos establecida');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos', err);
    });

// Agrupar ambas exportaciones en un solo objeto
module.exports = {
    config: config, // Exportar la configuración
    poolPromise: poolPromise, // Agregar una coma aquí
    query: async function (query, params) {
        try {
            const pool = await poolPromise;
            const request = pool.request(); // Crear un objeto Request
            // Agregar parámetros si se proporcionan
            if (params) {
                for (const key in params) {
                    request.input(key, params[key]);
                }
            }
            // Ejecutar la consulta
            const result = await request.query(query);
            return result.recordset; // Devolver los resultados
        } catch (error) {
            throw new Error(`Error al ejecutar la consulta: ${error.message}`);
        }
    }
};
