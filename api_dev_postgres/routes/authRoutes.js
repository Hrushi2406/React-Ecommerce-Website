const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const { loginValidator, signUpValidator } = require("../utils/validator");
const { db } = require("../utils/admin");
const { getUserByEmail, signUpUser } = require("../utils/query/userQuery");
const { userInterpolation } = require("../utils/changeDataInterpolation");
//LOGIN ROUTE
exports.login = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  let errors = {};
  try {
    const { error, valid } = loginValidator(user);
    errors = error;
    console.log(errors);

    if (!valid) {
      res.status(400).json(errors);
      return;
    }
    let response = await db.query(getUserByEmail(user.email));
    if (response.rowCount === 0) {
      errors.email = "This user doesn't exist";
      res.status(400).json(errors);
      return;
    }

    let data = response.rows[0];
    data = userInterpolation(data);
    let result = await bcrypt.compare(user.password, data.password);
    if (result) {
      var token = jwt.sign(
        { id: data.userId },
        process.env.ACCESS_TOKEN_SECRET
      );
    } else {
      errors.password = "Password is Incorrect";
      res.status(400).json(errors);
      return;
    }
    res.status(200).json({ token: token, auth: result, userData: data });
  } catch (error) {
    res.status(500).json({ errors: error.code });
  }
};

//Sign Up Route
exports.signUp = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    dob: req.body.dob,
    mobile: parseInt(req.body.mobile),
  };
  let errors = {};

  try {
    const { error, valid } = signUpValidator(user);
    errors = error;
    console.log(valid);

    if (!valid) {
      res.status(400).json(errors);
      return;
    }

    let response = await db.query(getUserByEmail(user.email));
    console.log(response.rows);

    if (response.rowCount === 0) {
      user.password = await bcrypt.hash(user.password, 10);
      delete user.confirmPassword;
      user.mobile = parseInt(user.mobile);
      let userResponse = await db.query(signUpUser(user));
      let data = userResponse.rows[0];
      data = userInterpolation(data);
      console.log(data);
      let token = jwt.sign(
        { id: data.userId },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(200).json({ token: token, auth: true, userData: data });
    } else {
      error.email = "This user already exists";
      res.status(400).json(errors);
    }
  } catch (error) {
    res.status(500).json({ errors: error.code });
  }
};

// exports.test = async (req, res) => {
//   let resp = await db.collection("products").get();
//   console.log(resp.docs.length);
//   let arr = [];
//   resp.docs.forEach((doc) => {
//     arr.push(doc.data());
//   });

//   let productId = arr.map((product) => product.productId);
//   console.log(productId);

//   console.log(productId.length);
// };
