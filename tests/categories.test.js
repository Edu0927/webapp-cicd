const request = require('supertest');

const app = require('../src/app');

const {
    sequelize,
    Category,
    Product
} = require('../src/models');


beforeAll(async () => {

    await sequelize.sync();

});


beforeEach(async () => {

    await Product.destroy({
        where: {}
    });

    await Category.destroy({
        where: {}
    });

});


afterAll(async () => {

    await sequelize.close();

});


// =============================================
// TEST 1
// GET CATEGORÍAS
// =============================================

test(
    'GET /api/categories debe obtener las categorías',
    async () => {

        await Category.create({
            name: 'Tecnologia'
        });

        const response =
            await request(app)
                .get('/api/categories');

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.statusCode)
            .toBe(200);

        expect(Array.isArray(response.body.data))
            .toBe(true);

    }
);


// =============================================
// TEST 2
// GET CATEGORÍA POR ID
// =============================================

test(
    'GET /api/categories/:id debe obtener una categoría',
    async () => {

        const category =
            await Category.create({
                name: 'Computadoras'
            });

        const response =
            await request(app)
                .get(
                    `/api/categories/${category.id}`
                );

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.data.name)
            .toBe('Computadoras');

    }
);


// =============================================
// TEST 3
// POST CATEGORÍA
// =============================================

test(
    'POST /api/categories debe crear una categoría',
    async () => {

        const response =
            await request(app)
                .post('/api/categories')
                .send({
                    name: 'Perifericos'
                });

        expect(response.statusCode)
            .toBe(201);

        expect(response.body.data.name)
            .toBe('Perifericos');

    }
);


// =============================================
// TEST 4
// PUT CATEGORÍA
// =============================================

test(
    'PUT /api/categories/:id debe actualizar una categoría',
    async () => {

        const category =
            await Category.create({
                name: 'Electronica'
            });

        const response =
            await request(app)
                .put(
                    `/api/categories/${category.id}`
                )
                .send({
                    name: 'Tecnologia'
                });

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.data.name)
            .toBe('Tecnologia');

    }
);


// =============================================
// TEST 5
// DELETE CATEGORÍA
// =============================================

test(
    'DELETE /api/categories/:id debe eliminar una categoría',
    async () => {

        const category =
            await Category.create({
                name: 'Temporal'
            });

        const response =
            await request(app)
                .delete(
                    `/api/categories/${category.id}`
                );

        expect(response.statusCode)
            .toBe(200);

    }
);


// =============================================
// ERROR 1
// POST SIN NOMBRE
// =============================================

test(
    'POST categoría sin nombre debe regresar 400',
    async () => {

        const response =
            await request(app)
                .post('/api/categories')
                .send({});

        expect(response.statusCode)
            .toBe(400);

    }
);


// =============================================
// ERROR 2
// CATEGORÍA INEXISTENTE
// =============================================

test(
    'GET categoría inexistente debe regresar 404',
    async () => {

        const response =
            await request(app)
                .get('/api/categories/999999');

        expect(response.statusCode)
            .toBe(404);

    }
);