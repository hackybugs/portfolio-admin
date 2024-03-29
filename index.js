const express = require('express')
const app = express();
const path = require('path');
require("dotenv").config();
const cors = require("cors");
// const jwt = require('jsonwebtoken');
app.use(cors());
const useragent = require('express-useragent');
app.use(useragent.express());

app.use(express.urlencoded({ limit:'5mb', extended: true }));
app.use(express.json({limit:'5mb'}));

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get(`/img/:folderName/:fileName`, (req, res) => {
  res.sendFile(__dirname + `/public/img/${req.params.folderName}/` + req.params.fileName), function (err) {
    if (err) {
      res.status(err.status).end();
    };
  };
});
// require('./src/config/database.js');
// const sequelizeConfig = 

// Initialize Sequelize with the development configuration
// const sequelize = new Sequelize(sequelizeConfig.development);

// Add other middleware configurations (cors, useragent, etc.)

// Define your routes

const PORT = process.env.PORT || 9700;
const userRouter = require('./src/routes/user');

app.use("/user",userRouter);


app.listen(PORT, async () => {
  // try {
  //   // Test the database connection
  //   await sequelize.authenticate();
  //   console.log('Database connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }

  console.log(`Server is running on port ${PORT}`);
});