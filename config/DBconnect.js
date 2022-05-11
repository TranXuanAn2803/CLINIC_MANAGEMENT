const async = require('hbs/lib/async');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('d84af0962luq84', 'adawzuvnwpaldy', 'fe4788a010e9d47d3596c2ca98a0d00377ebe6fc2dddc4efa1fca98e103a8903', {
    host: 'ec2-52-4-104-184.compute-1.amazonaws.com',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
let DBconnect = async() => {
    try {
        await sequelize.authenticate(); {
            console.log("Connecting to Database")
        }
    } catch (error) {
        console.error("Connect false");

    }
}
module.exports = { DBconnect };