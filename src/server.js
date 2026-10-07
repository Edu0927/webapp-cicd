const app = require('./app');

const { sequelize } = require('./models');

const startTcpServer =
    require('./tcp/tcpServer');


const PORT =
    process.env.PORT || 80;


// =============================================
// INICIAR BASE DE DATOS
// =============================================

sequelize.sync()
    .then(() => {

        console.log(
            'Base de datos conectada correctamente'
        );


        // =====================================
        // SERVIDOR HTTP
        // =====================================

        app.listen(
            PORT,
            '0.0.0.0',
            () => {

                console.log(
                    `Servidor HTTP ejecutándose en el puerto ${PORT}`
                );

            }
        );


        // =====================================
        // SERVIDOR TCP
        // =====================================

        startTcpServer();

    })
    .catch((error) => {

        console.error(
            'Error al conectar con la base de datos:',
            error
        );

    });