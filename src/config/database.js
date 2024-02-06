require('dotenv').config();
const { Sequelize } = require('sequelize');

// Access the configuration values
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUsername = process.env.DATABASE_USERNAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbName = process.env.DATABASE_NAME;
console.log('DB_HOST:', process.env.DB_HOST);
console.log(`Database name: ${dbName}`);
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
});

 sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
  })
  .catch (error => {
    console.error('Unable to connect to the database:', error);
  })

// // Export the configuration values
// module.exports = {
//   connectToDatabase,
// };
