const { Sequelize } = require('sequelize');
const initModels = require('../models/schemas/init-models');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
        logging: false,
        query: { raw: true },
        timezone: '+07:00',
        dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
    }
);

const DBconnect = async() => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error(error);
    }
};
module.exports = {
    DBconnect,
    sequelize,
    models: initModels(sequelize)
};