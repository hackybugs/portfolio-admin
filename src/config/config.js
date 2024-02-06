require("dotenv").config();
// console.log("::config::",process.env.DATABASE_PASSWORD,process.env.DATABASE_USERNAME,process.env.DATABASE_NAME);
module.exports = {
    use_env_variable: true,
    "development": {
        "username": process.env.DATABASE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": "localhost",
        "dialect": "postgres",  
        "logging": false,
        "define": {
            "underscored": true
        }
    },
    "test": {
        "username": process.env.DATABASE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": "localhost",
        "dialect": "postgres",
        "logging": false,
        "define": {
            "underscored": true
        }
    },
    "production": {
        "username": process.env.DATABASE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": process.env.DATABASE_HOST,
        "dialect": "postgres",
        "logging": false,
        "define": {
            "underscored": true
        }
    }
}