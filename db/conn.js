const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Lookup2Heaven', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Connected succesfully.');

} catch(err) {

console.log(`Was not able to connect: ${err}`)

}

module.exports =  sequelize;