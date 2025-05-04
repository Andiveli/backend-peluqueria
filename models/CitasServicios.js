import { DataTypes } from '@sequelize/core';
import { Citas } from './Citas.js';
import { Servicios } from './Servicios.js';
import db from '../config/db.js';


export const CitasServicios = db.define('citasServicios', {
    hora: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    citaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'citaId',
        references: {
            model: Citas,
            key: 'id',
        },
    },
    servicioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'servicioId',
        references: {
            model: Servicios,
            key: 'id',
        },
    },
}, {
    timestamps: false,
    tableName: 'citasServicios',
    freezeTableName: true,
})

CitasServicios.belongsTo(Servicios, {
    foreignKey: 'servicioId',
})
CitasServicios.belongsTo(Citas, {
    foreignKey: 'citaId',
})
Servicios.hasMany(CitasServicios, {
    foreignKey: 'servicioId',
})
Citas.hasMany(CitasServicios, {
    foreignKey: 'citaId',
})