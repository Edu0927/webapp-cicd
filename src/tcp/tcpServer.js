const net = require('net');

const { Product, Category } = require('../models');

const TCP_PORT = 6061;


function startTcpServer() {

    const server = net.createServer((socket) => {

        console.log(
            `Cliente TCP conectado: ${socket.remoteAddress}`
        );

        socket.setEncoding('utf8');


        socket.on('data', async (data) => {

            try {

                const message = data.trim();

                console.log(
                    'Mensaje TCP recibido:',
                    message
                );


                // ==========================================
                // INSERTAR PRODUCTO
                //
                // Formato:
                // {insert:{"name":"Laptop","price":15000,"categoryId":1}}
                // ==========================================

                if (
                    message.startsWith('{insert:') &&
                    message.endsWith('}')
                ) {

                    const content = message.substring(
                        8,
                        message.length - 1
                    );

                    const element = JSON.parse(content);

                    const {
                        name,
                        price,
                        categoryId
                    } = element;


                    // Validar datos
                    if (
                        !name ||
                        price === undefined ||
                        !categoryId
                    ) {

                        socket.write(
                            JSON.stringify({
                                statusCode: 400,
                                data: {
                                    message:
                                        'name, price y categoryId son obligatorios'
                                }
                            }) + '\n'
                        );

                        return;
                    }


                    // Verificar categoría
                    const category =
                        await Category.findByPk(categoryId);


                    if (!category) {

                        socket.write(
                            JSON.stringify({
                                statusCode: 404,
                                data: {
                                    message:
                                        'La categoría indicada no existe'
                                }
                            }) + '\n'
                        );

                        return;
                    }


                    // Crear producto
                    const product =
                        await Product.create({
                            name,
                            price,
                            categoryId
                        });


                    // Respuesta
                    socket.write(
                        JSON.stringify({
                            statusCode: 201,
                            data: product
                        }) + '\n'
                    );

                    return;
                }



                // ==========================================
                // OBTENER PRODUCTO
                //
                // Formato:
                // {get:1}
                // ==========================================

                if (
                    message.startsWith('{get:') &&
                    message.endsWith('}')
                ) {

                    const id = message.substring(
                        5,
                        message.length - 1
                    );


                    const product =
                        await Product.findByPk(
                            id,
                            {
                                include: {
                                    model: Category,
                                    attributes: [
                                        'id',
                                        'name'
                                    ]
                                }
                            }
                        );


                    if (!product) {

                        socket.write(
                            JSON.stringify({
                                statusCode: 404,
                                data: {
                                    message:
                                        'Producto no encontrado'
                                }
                            }) + '\n'
                        );

                        return;
                    }


                    socket.write(
                        JSON.stringify({
                            statusCode: 200,
                            data: product
                        }) + '\n'
                    );

                    return;
                }



                // ==========================================
                // COMANDO INCORRECTO
                // ==========================================

                socket.write(
                    JSON.stringify({
                        statusCode: 400,
                        data: {
                            message:
                                'Comando TCP no válido'
                        }
                    }) + '\n'
                );


            } catch (error) {

                console.error(
                    'Error TCP:',
                    error
                );


                socket.write(
                    JSON.stringify({
                        statusCode: 500,
                        data: {
                            message:
                                'Error al procesar la solicitud TCP',
                            error:
                                error.message
                        }
                    }) + '\n'
                );

            }

        });


        // Cliente desconectado
        socket.on('end', () => {

            console.log(
                'Cliente TCP desconectado'
            );

        });


        // Error de conexión
        socket.on('error', (error) => {

            console.error(
                'Error en conexión TCP:',
                error.message
            );

        });

    });


    // ==========================================
    // INICIAR SERVIDOR TCP
    // ==========================================

    server.listen(
        TCP_PORT,
        '0.0.0.0',
        () => {

            console.log(
                `Servidor TCP ejecutándose en el puerto ${TCP_PORT}`
            );

        }
    );

}


module.exports = startTcpServer;