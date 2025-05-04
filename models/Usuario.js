import {DataTypes, Sequelize} from '@sequelize/core';

import db from '../config/db.js';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

export const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        trim: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
        defaultValue: generarId(),
    },
})

// hashear password
Usuario.addHook('beforeCreate', async function(user) {
    const isHash = user.password.startsWith('$2b$10$');
    if (!isHash) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);    
    }
})
Usuario.addHook('beforeUpdate', async function(user) {
    const isHash = user.password.startsWith('$2b$10$');
    if(!isHash) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
})
//comprobar password
Usuario.prototype.verificarPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
