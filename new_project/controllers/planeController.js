// /*eslint-disable*/

const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllUsers = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();

    const users = await features.query;

    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "We have not found anything !!",
    });
  }
};