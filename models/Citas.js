import {DataTypes} from '@sequelize/core';
import db from '../config/db.js';
import { Usuario } from './Usuario.js';

export const Citas = db.define('citas', {
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'usuarioId',
        refences: {
            model: Usuario,
            key: 'id',
        },
    },
    completa: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

Usuario.hasMany(Citas, {
    foreignKey: 'usuarioId',
})
Citas.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
})