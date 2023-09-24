const db = require("../configuration/dbConn");

module.exports = {
  getAllLocation: async () => {
    return new Promise((resolve, reject) => {
      db.manyOrNone("SELECT *  FROM location_tbl")
        .then(function (courses) {
          if (courses) {
            resolve(courses);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  getAllLocationByName: async (name) => {
    return new Promise((resolve, reject) => {
      db.manyOrNone("SELECT * FROM location_tbl WHERE name ILIKE $1", [
        `%${name}%`,
      ])
        .then(function (locations) {
          if (locations) {
            resolve(locations);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
};
