const express = require('express');
const router = express.Router();

const { Product, Category } = require('../models');


// =============================================
// 1. GET - Obtener todos los productos
// =============================================
router.get('/', async (req, res) => {
    try {

        const products = await Product.findAll({
            include: {
                model: Category,
                attributes: ['id', 'name']
            }
        });

        res.status(200).json({
            statusCode: 200,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message: 'Error al obtener los productos',
                error: error.message
            }
        });

    }
});


// =============================================
// 2. GET - Obtener producto por ID
// =============================================
router.get('/:id', async (req, res) => {
    try {

        const product = await Product.findByPk(
            req.params.id,
            {
                include: {
                    model: Category,
                    attributes: ['id', 'name']
                }
            }
        );

        if (!product) {

            return res.status(404).json({
                statusCode: 404,
                data: {
                    message: 'Producto no encontrado'
                }
            });

        }

        res.status(200).json({
            statusCode: 200,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message: 'Error al obtener el producto',
                error: error.message
            }
        });

    }
});


// =============================================
// 3. POST - Crear producto
// =============================================
router.post('/', async (req, res) => {
    try {

        const {
            name,
            price,
            categoryId
        } = req.body;

        if (
            !name ||
            price === undefined ||
            !categoryId
        ) {

            return res.status(400).json({
                statusCode: 400,
                data: {
                    message:
                        'name, price y categoryId son obligatorios'
                }
            });

        }

        const category =
            await Category.findByPk(categoryId);

        if (!category) {

            return res.status(404).json({
                statusCode: 404,
                data: {
                    message:
                        'La categoría indicada no existe'
                }
            });

        }

        const product = await Product.create({
            name,
            price,
            categoryId
        });

        res.status(201).json({
            statusCode: 201,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message: 'Error al crear el producto',
                error: error.message
            }
        });

    }
});


// =============================================
// 4. PUT - Actualizar producto
// =============================================
router.put('/:id', async (req, res) => {
    try {

        const product =
            await Product.findByPk(req.params.id);

        if (!product) {

            return res.status(404).json({
                statusCode: 404,
                data: {
                    message: 'Producto no encontrado'
                }
            });

        }

        const {
            name,
            price,
            categoryId
        } = req.body;


        if (categoryId !== undefined) {

            const category =
                await Category.findByPk(categoryId);

            if (!category) {

                return res.status(404).json({
                    statusCode: 404,
                    data: {
                        message:
                            'La categoría indicada no existe'
                    }
                });

            }
        }


        await product.update({

            name:
                name !== undefined
                    ? name
                    : product.name,

            price:
                price !== undefined
                    ? price
                    : product.price,

            categoryId:
                categoryId !== undefined
                    ? categoryId
                    : product.categoryId

        });


        res.status(200).json({
            statusCode: 200,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message:
                    'Error al actualizar el producto',
                error: error.message
            }
        });

    }
});


// =============================================
// 5. DELETE - Eliminar producto
// =============================================
router.delete('/:id', async (req, res) => {
    try {

        const product =
            await Product.findByPk(req.params.id);

        if (!product) {

            return res.status(404).json({
                statusCode: 404,
                data: {
                    message: 'Producto no encontrado'
                }
            });

        }

        await product.destroy();

        res.status(200).json({
            statusCode: 200,
            data: {
                message:
                    'Producto eliminado correctamente'
            }
        });

    } catch (error) {

        res.status(500).json({
            statusCode: 500,
            data: {
                message:
                    'Error al eliminar el producto',
                error: error.message
            }
        });

    }
});


module.exports = router;