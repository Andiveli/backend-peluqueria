import Sequelize from '@sequelize/core';
import { MariaDbDialect } from '@sequelize/mariadb';
import dotenv from 'dotenv';
dotenv.config();

// const conectarDb = async () => {
//     try {
//         const db = await new Sequelize({
//             dialect: MariaDbDialect,
//             host: process.env.DB_HOST,
//             port: process.env.DB_PORT,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME,
//             define: {
//                 timestamps: false,
//                 underscored: true,
//             },
//         })
//         const url = `${db.rawOptions.host} : ${db.rawOptions.port}`
//         console.log('Base de datos conectada con éxito en', url);
//         return db;
        
//     } catch (error) {
//         console.error('Error al conectar a la base de datos:', error.message);
//         process.exit(1);
//     }

// }

const db = new Sequelize({
    dialect: MariaDbDialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        timestamps: false,
        underscored: true,
    },
})
const url = `${db.rawOptions.host} : ${db.rawOptions.port}`
console.log('Base de datos conectada con éxito en', url);

export default db;