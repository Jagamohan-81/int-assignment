const express = require("express");
const router = express.Router();
const {
  getAllLocation,
  getAllLocationByName,
} = require("../controllers/locationController");
const {
  validateDB,
  validateStudentExistanceInDB,
} = require("../helpers/userDbValidate");
const {
  userAuthenticateMiddleware,
} = require("../helpers/authenticateMiddleware");

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to Student route" });
});

router.get("/get-list", getAllLocation);
router.get("/get-list/:name", getAllLocationByName);

module.exports = router;
