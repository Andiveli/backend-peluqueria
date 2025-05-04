import {DataTypes} from '@sequelize/core'
import db from '../config/db.js'

export const Servicios = db.define('servicios', {
    nombre: {
        type: DataTypes.STRING(),
        allowNull: false,
        trim: true
    },
    precio: {
        type: DataTypes.STRING(),
        allowNull: false,
        trim: true
    }
});
