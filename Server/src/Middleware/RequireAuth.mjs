import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  let user_id;
  let AccountModel;

  if (!authorization) {
    return res
      .status(401)
      .send({ errors: ["You must be signed in to do this"] });
  }

  token = authorization.replace("Bearer ", "");
  try {
    user_id = jwt.verify(token, process.env.JWT_KEY).user_id;
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .send({ errors: ["You must be signed in to do this"] });
  }

  AccountModel = mongoose.model("Account");
  req.user = await AccountModel.findById(user_id);

  next();
};
