const Promise = require("bluebird");
const Config = require("./config");
const initOptions = {
  promiseLib: Promise,
  query(e) {
    // console.log(e.query);
  },
  error(error, e) {
    if (e.cn) {
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  },
};
const pgp = require("pg-promise")(initOptions);

const cn = {
  host: Config.db.DB_HOST,
  port: Config.db.DB_PORT,
  database: Config.db.DB_NAME,
  user: Config.db.DB_USER,
  password: Config.db.DB_PASS,
};

pgp.pg.types.setTypeParser(1114, (s) => s);

const db = pgp(cn);

db.connect()
  .then((obj) => {
    obj.done();
    console.log("db connection established");
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

module.exports = db;
// DB_HOST=localhost
// DB_NAME=library-management
// DB_USER=postgres
// DB_PASS=root
// DB_PORT=5432
// APP_PORT=3000
// SALT_ROUNDS = 10
// JWT_SECRET=jagamohan_panda_81
