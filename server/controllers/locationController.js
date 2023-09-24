const adminModal = require("../models/adminModal");
module.exports = {
  getAllLocation: async (req, res, next) => {
    try {
      await adminModal.getAllLocation().then((data) => {
        if (data) {
          res.status(200).json({
            status: "OK",
            message: "All Locations Fetched Successfully",
            data: data,
          });
        } else {
          res.status(400).json({
            status: "FAILED",
            message: "Issue Fetching location",
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 3, message: error }).end();
    }
  },
  getAllLocationByName: async (req, res, next) => {
    const { name } = req.params;
    try {
      await adminModal.getAllLocationByName(name).then((data) => {
        if (data) {
          res.status(200).json({
            status: "OK",
            message: "All Locations Fetched Successfully",
            data: data,
          });
        } else {
          res.status(400).json({
            status: "FAILED",
            message: "Issue Fetching location",
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 3, message: error }).end();
    }
  },
};
