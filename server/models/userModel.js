const db = require("../configuration/dbConn");

module.exports = {
  userUpdate: async (data) => {
    return new Promise((resolve, reject) => {
      db.one(
        "INSERT INTO user_tbl(user_name,user_email,user_password,user_role,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING user_id",
        [data.name, data.email, data.password, data.role, data.created_at]
      )
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
};
