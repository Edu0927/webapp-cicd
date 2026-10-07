const {
    Sequelize
} = require('sequelize');

const path = require('path');


let databasePath;


// =============================================
// BASE DE DATOS DE PRUEBAS
// =============================================

if (process.env.NODE_ENV === 'test') {

    databasePath = path.join(
        __dirname,
        '../../data/database-test.sqlite'
    );

} else {

    databasePath = path.join(
        __dirname,
        '../../data/database.sqlite'
    );

}


const sequelize =
    new Sequelize({

        dialect: 'sqlite',

        storage: databasePath,

        logging: false

    });


module.exports = sequelize;