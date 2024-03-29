const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await user.findOne({ email });

  if (!userInfo) {
    throw new APIError("No account found for this email!", 404);
  }

  const comparePassword = await bcrypt.compare(password, userInfo.password);
  console.log(comparePassword);
  if (!comparePassword) {
    throw new APIError("Email or password is incorrect!", 401);
  }

  createToken(userInfo, res);
};

const register = async (req, res) => {
  const { email } = req.body;
  const userCheck = await user.findOne({ email });

  if (userCheck) {
    throw new APIError("Email does not exist!", 401);
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const userSave = new user(req.body);
  await userSave
    .save()
    .then((data) => {
      return new Response(data, "Register is successful").created(res);
    })
    .catch((err) => {
      throw new APIError("An error occurred during registration!", 400);
    });
};

module.exports = {
  login,
  register,
};
