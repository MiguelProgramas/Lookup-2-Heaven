const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

// User

const Verse = db.define('Verse', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
})

Verse.belongsTo(User);
User.hasMany(Verse);

module.exports = Verse;