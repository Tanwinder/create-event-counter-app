const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Token = require('../models/tokenmodel');
const Users= require("../models/user");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const generateAccessToken = (oldUser) => {
  return jwt.sign({ 
    email: oldUser.email, 
    firstname: oldUser.firstName, 
    lastname: oldUser.lastName, 
    id: oldUser._id }, 
    ACCESS_TOKEN_SECRET, 
    { 
      expiresIn: 30   //30 seconds
    });
}

const generateRefreshToken = async (oldUser) => {
  const refreshToken = jwt.sign({ 
    email: oldUser.email, 
    firstname: oldUser.firstName, 
    lastname: oldUser.lastName, 
    id: oldUser._id }, 
    REFRESH_TOKEN_SECRET, 
    { 
      expiresIn: 60 * 10 // 10 mins
    });
  await new Token({ token: refreshToken }).save();
  return refreshToken;
}

const signin = async (req, res) => {
  const { email, password } = req.body;
  // return res.send("testing - working fine");

  try {

    const oldUser = await Users.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(oldUser);
    const refreshToken = await generateRefreshToken(oldUser);

    res.status(200).send({ result: oldUser, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await Users.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({ email, password: hashedPassword, firstName: firstName, lastName: lastName });

    const accessToken = generateAccessToken(result);
    const refreshToken = await generateRefreshToken(result);

    res.status(201).send({ result, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
    
    console.log(error);
  }
};

const refreshtoken = async (req, res) => {
  try {
    //get refreshToken
    const { refreshToken } = req.body;
    //send error if no refreshToken is sent
    if (!refreshToken) {
      return res.status(403).json({ error: "Access denied,token missing!" });
    } else {
      //query for the token to check if it is valid:
      const tokenDoc = await Token.findOne({ token: refreshToken });
      //send error if no token found:
      if (!tokenDoc) {
        return res.status(401).json({ error: "Token expired!" });
      } else {
        //extract payload from refresh token and generate a new access token and send it
        const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
        // const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
        //   expiresIn: "10m",
        // });
        const accessToken = generateAccessToken(payload);
        return res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
}

const logout = async (req, res) => {
  try {
    //delete the refresh token saved in database:
    const { refreshToken } = req.body;
    await Token.findOneAndDelete({ token: refreshToken });
    return res.status(200).json({ success: "User logged out!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
}

module.exports = {signin, signup, refreshtoken, logout};