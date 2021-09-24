import express from "express";

const AccountRoutes = express.Router();

AccountRoutes.post("/signup", (req, res) => {
  console.log(req.body);

  const data = {
    username: "EriksTheMagnificent",
    token: "JTW_SERVER_TEST_TOKEN",
  };

  res.send(data);
});

export default AccountRoutes;
