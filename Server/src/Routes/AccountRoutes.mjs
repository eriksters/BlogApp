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
        _id: "614f87e103be91078b5b1b6f",
        username: "TestUser",
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
    username: CreatedAccount.username,
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

  //  Check if login is using one of the test emails

  if (
    (process.env.NODE_ENV !== "dev" &&
      signInData.email === "eriks@gmail.com") ||
    signInData.email === "test@test.com"
  ) {
    return res.status(401).send({ errors: ["No"] });
  }

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

AccountRoutes.post("/:userId/likes", RequireAuth, async (req, res) => {
  const AccountModel = mongoose.model("Account");
  const BlogPostModel = mongoose.model("BlogPost");
  let Session;

  //  Check if user is trying to create a like for someone else
  if (req.params.userId !== req.account._id.toString()) {
    return res.status(401).send({
      errors: ["You are not allowed to like a post on behalf of another user."],
    });
  }

  //  Check if body format is correct
  if (!req.body.BlogPostId) {
    return res.status(400).send({
      errors: ["BlogPostId is a required field"],
    });
  }

  Session = await mongoose.startSession();
  try {
    await Session.startTransaction();

    //  Increment the LikeCounter on the post
    await BlogPostModel.findOneAndUpdate(
      { _id: req.body.BlogPostId },
      { $inc: { LikeCount: 1 } }
    ).session(Session);

    //  Add post id to the LikedPosts array in account model
    //  If the id is not unique, return 400
    //  mongoose-unique-array plugin only runs the validator on save()
    try {
      const ac = await AccountModel.findOne({ _id: req.account._id }).exec();
      ac.LikedPosts.push(req.body.BlogPostId);
      await ac.save();
    } catch (err) {
      throw { DUPLICATE_ERROR: true };
    }

    await Session.commitTransaction();
    Session.endSession();

    res.sendStatus(200);
  } catch (err) {
    console.log(err);

    await Session.abortTransaction();
    Session.endSession();

    if (err.DUPLICATE_ERROR) {
      return res
        .status(400)
        .send({ errors: ["Can not like the same post twice"] });
    } else {
      return res.sendStatus(500);
    }
  }
});

export default AccountRoutes;
