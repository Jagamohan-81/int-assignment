require("dotenv").config();
const Config = {
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,
  },
};

module.exports = Config;

// DB_HOST=localhost
// DB_NAME=library-management
// DB_USER=postgres
// DB_PASS=root
// DB_PORT=5432
// APP_PORT=3000
// SALT_ROUNDS = 10
// JWT_SECRET=jagamohan_panda_81
