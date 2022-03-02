require('dotenv').config()

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host":process.env.DB_HOST ||  "127.0.0.1",
        "dialect": process.env.DB_DIALECT ||  "mysql"
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST ||  "127.0.0.1",
        "dialect": process.env.DB_DIALECT ||  "mysql"
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect":process.env.DB_DIALECT || "mysql"
    }
}
