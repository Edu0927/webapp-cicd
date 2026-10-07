const express = require('express');
const router = express.Router();

const { Category } = require('../models');


// =============================================
// 6. GET - Obtener categorías
// =============================================
router.get('/', async (req, res) => {
    try {

        const categories =
            await Category.findAll();

        res.status(200).json({
            statusCode: 200,
            data: categories
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message:
                    'Error al obtener las categorías',
                error: error.message
            }
        });

    }
});


// =============================================
// 7. GET - Obtener categoría por ID
// =============================================
router.get('/:id', async (req, res) => {
    try {

        const category =
            await Category.findByPk(req.params.id);

        if (!category) {

            return res.status(404).json({
                statusCode: 404,
                data: {
                    message:
                        'Categoría no encontrada'
                }
            });

        }

        res.status(200).json({
            statusCode: 200,
            data: category
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message:
                    'Error al obtener la categoría',
                error: error.message
            }
        });

    }
});


// =============================================
// 8. POST - Crear categoría
// =============================================
router.post('/', async (req, res) => {
    try {

        const { name } = req.body;

        if (!name) {

            return res.status(400).json({
                statusCode: 400,
                data: {
                    message:
                        'El nombre es obligatorio'
                }
            });

        }

        const category =
            await Category.create({
                name
            });

        res.status(201).json({
            statusCode: 201,
            data: category
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message:
                    'Error al crear la categoría',
                error: error.message
            }
        });

    }
});


// =============================================
// 9. PUT - Actualizar categoría
// =============================================
router.put('/:id', async (req, res) => {
    try {

        const category =
            await Category.findByPk(req.params.id);

        if (!category) {

            return res.status(404).json({
                statusCode: 404,
                data: {
                    message:
                        'Categoría no encontrada'
                }
            });

        }

        const { name } = req.body;

        if (!name) {

            return res.status(400).json({
                statusCode: 400,
                data: {
                    message:
                        'El nombre es obligatorio'
                }
            });

        }

        await category.update({
            name
        });

        res.status(200).json({
            statusCode: 200,
            data: category
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message:
                    'Error al actualizar la categoría',
                error: error.message
            }
        });

    }
});


// =============================================
// 10. DELETE - Eliminar categoría
// =============================================
router.delete('/:id', async (req, res) => {
    try {

        const category =
            await Category.findByPk(req.params.id);

        if (!category) {

            return res.status(404).json({
                statusCode: 404,
                data: {
                    message:
                        'Categoría no encontrada'
                }
            });

        }

        await category.destroy();

        res.status(200).json({
            statusCode: 200,
            data: {
                message:
                    'Categoría eliminada correctamente'
            }
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message:
                    'No se puede eliminar la categoría',
                error: error.message
            }
        });

    }
});


module.exports = router;