const express = require('express');
const cors = require('cors');

const productsRoutes =
    require('./routes/products');

const categoriesRoutes =
    require('./routes/categories');

const databaseRoutes =
    require('./routes/database');


const app = express();


// =============================================
// MIDDLEWARES
// =============================================

app.use(cors());

app.use(express.json());


// =============================================
// RUTA PRINCIPAL
// =============================================

app.get('/', (req, res) => {

    res.status(200).json({
        statusCode: 200,
        data: {
            message:
                'WebApp API - Tercera prueba CI/CD exitosa'
        }
    });

});


// =============================================
// RUTAS
// =============================================

app.use(
    '/api/products',
    productsRoutes
);

app.use(
    '/api/categories',
    categoriesRoutes
);

app.use(
    '/api',
    databaseRoutes
);


// =============================================
// EXPORTAR EXPRESS PARA JEST
// =============================================

module.exports = app;