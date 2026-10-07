const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const { sequelize, Product, Category } = require('../models');


// =====================================================
// 9. GET /api/backup
// Crear y descargar backup de la base de datos
// =====================================================
router.get('/backup', async (req, res) => {
    try {

        // Ruta de la base de datos original
        const databasePath = path.join(
            __dirname,
            '../../data/database.sqlite'
        );

        // Carpeta donde se guardarán los backups
        const backupDirectory = path.join(
            __dirname,
            '../../backups'
        );

        // Crear la carpeta backups si no existe
        if (!fs.existsSync(backupDirectory)) {
            fs.mkdirSync(backupDirectory, {
                recursive: true
            });
        }

        // Crear nombre único para el backup
        const date = new Date()
            .toISOString()
            .replace(/[:.]/g, '-');

        const backupFile = `backup-${date}.sqlite`;

        // Ruta completa del archivo de backup
        const backupPath = path.join(
            backupDirectory,
            backupFile
        );

        // Copiar la base de datos
        fs.copyFileSync(
            databasePath,
            backupPath
        );

        // Descargar el archivo al usuario
        res.download(
            backupPath,
            backupFile,
            (error) => {

                if (error) {
                    console.error(
                        'Error al descargar el backup:',
                        error
                    );
                }

            }
        );

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message: 'Error al crear el backup',
                error: error.message
            }
        });

    }
});


// =====================================================
// 10. DELETE /api/database
// Vaciar la base de datos
// =====================================================
router.delete('/database', async (req, res) => {
    try {

        // Eliminar primero los productos
        await Product.destroy({
            where: {},
            truncate: true
        });

        // Después eliminar las categorías
        await Category.destroy({
            where: {},
            truncate: true
        });

        // Sincronizar nuevamente la base de datos
        await sequelize.sync();

        // Respuesta
        res.status(200).json({
            statusCode: 200,
            data: {
                message: 'Base de datos vaciada correctamente'
            }
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message: 'Error al vaciar la base de datos',
                error: error.message
            }
        });

    }
});


// =====================================================
// Exportar rutas
// =====================================================
module.exports = router;