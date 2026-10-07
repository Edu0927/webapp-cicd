const request = require('supertest');

const app = require('../src/app');

const {
    sequelize,
    Product,
    Category
} = require('../src/models');


let category;


// =============================================
// PREPARACIÓN
// =============================================

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

    category =
        await Category.create({
            name: 'Tecnologia'
        });

});


afterAll(async () => {

    await sequelize.close();

});


// =============================================
// TEST 6
// GET PRODUCTOS
// =============================================

test(
    'GET /api/products debe obtener los productos',
    async () => {

        await Product.create({
            name: 'Laptop',
            price: 15000,
            categoryId: category.id
        });

        const response =
            await request(app)
                .get('/api/products');

        expect(response.statusCode)
            .toBe(200);

        expect(Array.isArray(response.body.data))
            .toBe(true);

    }
);


// =============================================
// TEST 7
// GET PRODUCTO POR ID
// =============================================

test(
    'GET /api/products/:id debe obtener un producto',
    async () => {

        const product =
            await Product.create({
                name: 'Monitor',
                price: 3000,
                categoryId: category.id
            });

        const response =
            await request(app)
                .get(
                    `/api/products/${product.id}`
                );

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.data.name)
            .toBe('Monitor');

    }
);


// =============================================
// TEST 8
// POST PRODUCTO
// =============================================

test(
    'POST /api/products debe crear un producto',
    async () => {

        const response =
            await request(app)
                .post('/api/products')
                .send({
                    name: 'Mouse Gamer',
                    price: 1200,
                    categoryId: category.id
                });

        expect(response.statusCode)
            .toBe(201);

        expect(response.body.data.name)
            .toBe('Mouse Gamer');

    }
);


// =============================================
// TEST 9
// PUT PRODUCTO
// =============================================

test(
    'PUT /api/products/:id debe actualizar un producto',
    async () => {

        const product =
            await Product.create({
                name: 'Mouse',
                price: 500,
                categoryId: category.id
            });

        const response =
            await request(app)
                .put(
                    `/api/products/${product.id}`
                )
                .send({
                    name: 'Mouse Gamer',
                    price: 1200
                });

        expect(response.statusCode)
            .toBe(200);

        expect(response.body.data.name)
            .toBe('Mouse Gamer');

        expect(
            Number(response.body.data.price)
        ).toBe(1200);

    }
);


// =============================================
// TEST 10
// DELETE PRODUCTO
// =============================================

test(
    'DELETE /api/products/:id debe eliminar un producto',
    async () => {

        const product =
            await Product.create({
                name: 'Producto Temporal',
                price: 100,
                categoryId: category.id
            });

        const response =
            await request(app)
                .delete(
                    `/api/products/${product.id}`
                );

        expect(response.statusCode)
            .toBe(200);

    }
);


// =============================================
// ERROR 3
// PRODUCTO SIN DATOS OBLIGATORIOS
// =============================================

test(
    'POST producto sin datos debe regresar 400',
    async () => {

        const response =
            await request(app)
                .post('/api/products')
                .send({
                    name: 'Laptop'
                });

        expect(response.statusCode)
            .toBe(400);

    }
);


// =============================================
// ERROR 4
// CATEGORÍA INEXISTENTE
// =============================================

test(
    'POST con categoría inexistente debe regresar 404',
    async () => {

        const response =
            await request(app)
                .post('/api/products')
                .send({
                    name: 'Laptop',
                    price: 15000,
                    categoryId: 999999
                });

        expect(response.statusCode)
            .toBe(404);

    }
);


// =============================================
// ERROR 5
// PRODUCTO INEXISTENTE
// =============================================

test(
    'GET producto inexistente debe regresar 404',
    async () => {

        const response =
            await request(app)
                .get('/api/products/999999');

        expect(response.statusCode)
            .toBe(404);

    }
);


// =============================================
// ERROR 6
// ACTUALIZAR PRODUCTO INEXISTENTE
// =============================================

test(
    'PUT producto inexistente debe regresar 404',
    async () => {

        const response =
            await request(app)
                .put('/api/products/999999')
                .send({
                    name: 'Producto'
                });

        expect(response.statusCode)
            .toBe(404);

    }
);


// =============================================
// ERROR 7
// ELIMINAR PRODUCTO INEXISTENTE
// =============================================

test(
    'DELETE producto inexistente debe regresar 404',
    async () => {

        const response =
            await request(app)
                .delete('/api/products/999999');

        expect(response.statusCode)
            .toBe(404);

    }
);