const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Fixed = db.define('Fixed', {
    title: {
        type: DataTypes.STRING,
        require: true
    },
})

module.exports = Fixed;