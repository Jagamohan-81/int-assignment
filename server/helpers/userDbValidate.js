const adminModal = require("../models/adminModal");

module.exports = {
  validateDB: async (req, resp, next) => {
    const { role } = req.body;
    try {
      const { email } = req.body;
      let userExist;
      if (role == "A") {
        userExist = await adminModal.findUserExistance(email);
      } else if (role == "S") {
        userExist = await adminModal.findStudentExistance(email);
      }
      if (userExist.success) {
        return resp
          .status(409)
          .json({ status: 3, message: "User already exist" });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      resp.status(400).json({ status: 3, message: error.message });
    }
  },
  validateUserExistanceInDB: async (req, resp, next) => {
    try {
      const { email } = req.body;
      let userExist = await adminModal.findUserExistance(email);
      if (userExist.success) {
        next();
      } else {
        resp
          .status(404)
          .json({ status: 3, message: "Email not found in user database" });
      }
    } catch (error) {
      console.log(error);
      resp.status(400).json({ status: 3, message: error.message });
    }
  },

  validateStudentExistanceInDB: async (req, resp, next) => {
    try {
      const { email } = req.body;
      let userExist = await adminModal.findStudentExistance(email);
      if (userExist.success) {
        next();
      } else {
        resp
          .status(404)
          .json({ status: 3, message: "Email not found in student database" });
      }
    } catch (error) {
      console.log(error);
      resp.status(400).json({ status: 3, message: error.message });
    }
  },
};
