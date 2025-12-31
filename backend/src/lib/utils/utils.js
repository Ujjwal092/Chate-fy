import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  //userId is used to identify the user for whom the token is generated

  //res is sent to the client as a cookie
  res.cookie("jwt", token, {
    httpOnly: true, //prevent Cross site scripting attacks or XSS attacks
    secure: process.env.NODE_ENV === "development" ? false : true, //HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000, //millisecond (7 days)
    sameSite: "strict", //CSRF attacks
  });
  return token;
};

//http is not secure but https is secure
