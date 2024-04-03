const express = require('express');
const db = require('../models');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../helpers/index.helpers');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await db.User.findOne({
      where: {
        email: email
      }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    const workFactor = 10;

    const hash = await bcrypt.hash(password, workFactor);

    // Create a new user
    const newUser = await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      createdAt: new Date() // Invoke now() to get the current timestamp
    });
    // Generate access token for the user
    // const token = generateAccessToken(newUser);

    res.status(200).json({
      // token: token,
      message: "Registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: textMessage.login.notRegistered });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect password' });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await db.Refresh_token.create({
      user_id: user.id,
      token: refreshToken,
      type: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(200).json({ token: accessToken, message: 'Logged in successfully' })

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

}

const refreshToken = async (req, res, user_id) => {
  try {
    // Retrieve the refresh token from the database
    const refreshTokenData = await db.RefreshToken.findOne({ where: { user_id: user_id } });

    if (!refreshTokenData) {
      return res.sendStatus(403); // Forbidden
    }

    // Verify and decode the refresh token
    jwt.verify(refreshTokenData.token, 'secret', (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      // Generate a new access token using the decoded user information
      const user = { id: decoded.id, email: decoded.email };
      const accessToken = generateAccessToken(user);

      // Return the new access token to the client
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.sendStatus(500); // Internal Server Error
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    const secret = "secret";
    const decoded = jwt.verify(token, secret);
    await db.Refresh_token.destroy({
      where: {
        user_id: decoded.id,
      }
    });
    // Perform logout logic here, such as invalidating the token or deleting it from the database

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { register, login, logout };