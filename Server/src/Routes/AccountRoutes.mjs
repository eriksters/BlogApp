import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import RequireAuth from "../Middleware/RequireAuth.mjs";

const AccountRoutes = express.Router();

//  Checks for invalid user data
const validateAccountData = async ({ username, password, email }) => {
  let errors = [];

  //  Asynchronously check for username and email uniqueness
  const AccountModel = mongoose.model("Account");

  const checkUsernameUnique = async () => {
    if (await AccountModel.exists({ username }))
      return "Username already in use";
  };

  const checkEmailUnique = async () => {
    if (await AccountModel.exists({ email })) return "Email already in use";
  };

  const uniqueErrors = await Promise.all([
    checkUsernameUnique(),
    checkEmailUnique(),
  ]);

  uniqueErrors.forEach((err) => {
    if (err) errors = [...errors, err];
  });

  if (username.length < 3)
    errors = [...errors, "Username must be at least 3 characters long"];

  const regContainsLowercase = /^(?=.*[a-z])/;
  if (!regContainsLowercase.test(password))
    errors = [...errors, "Password must contain at least one lowercase letter"];

  const regContainsUppercase = /^(?=.*[A-Z])/;
  if (!regContainsUppercase.test(password))
    errors = [...errors, "Password must contain at least one uppercase letter"];

  const regContainsSpecial = /^(?=.*[~!@#$%^&*)(_+:[}="`-])/;
  if (!regContainsSpecial.test(password))
    errors = [
      ...errors,
      "Password must contain at least one special character",
    ];

  const regContainsNumber = /^(?=.*\d)/;
  if (!regContainsNumber.test(password))
    errors = [...errors, "Password must contain at least one number"];

  const regLength = /^[~!@#$%^&*)(+:[}="`\w-]{8,20}/;
  if (!regLength.test(password))
    errors = [...errors, "Password must be between 8 and 20 characters long"];

  const regEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!regEmail.test(email)) errors = [...errors, "Invalid email format"];

  return errors;
};

//  Creates token from account
const signToken = (account) => {
  return jwt.sign({ user_id: account._id.toString() }, process.env.JWT_KEY);
};

AccountRoutes.post("/signup", async (req, res) => {
  const signUpData = req.body;
  let hash = null;
  let CreatedAccount = null;
  let NewAccount = null;
  let AccountModel = null;

  //  Validate the sign up details (password length, email format, etc.)
  const errors = await validateAccountData(signUpData);
  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).send({
      errors,
    });
  }

  //  Generate a password hash
  try {
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(signUpData.password, salt);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  //  Create the new account
  AccountModel = mongoose.model("Account");

  NewAccount = new AccountModel({
    username: signUpData.username,
    password: hash,
    email: signUpData.email,
  });

  try {
    if (process.env.NODE_ENV === "dev") {
      CreatedAccount = {
        ...signUpData,
        _id: 123,
      };
    } else {
      CreatedAccount = await NewAccount.save();
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  //  Generate a JWT
  const token = signToken(CreatedAccount);

  const data = {
    username: signUpData.username,
    _id: CreatedAccount._id,
    token,
  };

  res.send(data);
});

AccountRoutes.post("/signin", async (req, res) => {
  let passwordMatch = false;
  let token = null;
  const AccountModel = mongoose.model("Account");
  const signInData = req.body;

  const Account = await AccountModel.findOne({
    email: signInData.email,
  }).exec();
  if (Account === null) {
    return res.status(400).send({ errors: ["Email or Password invalid"] });
  }

  passwordMatch = await bcrypt.compare(signInData.password, Account.password);
  if (!passwordMatch) {
    return res.status(400).send({ errors: ["Email or Password invalid"] });
  }

  token = signToken(Account);

  return res.status(200).send({
    token,
    _id: Account._id,
    username: Account.username,
  });
});

export default AccountRoutes;
