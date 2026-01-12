import jwt from "jsonwebtoken";

//this userId will come quickly from the database when user logs in or registers
export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //userId is used to identify the user for whom the token is generated and if we want to fetch id will use ".id" this cause error in auth.middleware.js

  //res is sent to the client as a cookie
  res.cookie("jwt", token, {
    httpOnly: true, //prevent Cross site scripting attacks or XSS attacks
    secure: process.env.NODE_ENV === "development" ? false : true, //HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000, //millisecond (7 days)
    sameSite: "lax", //CSRF attacks
  });
  return token;
};

//http is not secure but https is secure
