const express = require('express');
const db = require('../models');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    await db.User.findOne({
      where: {
        email: email
      }
    }).then((info) => {
      if (!info.length) {
        return res.status(400).json({ error: 'User with this email already exists' }); exit;
      }

      const workFactor = 4; // Increase the work factor for stronger hashing

      // Generate salt and hash the password
      // const salt = await bcrypt.genSalt(workFactor);
      // const hashedPassword = await bcrypt.hash(password, salt);

      bcrypt.hash(password, 10, async (bErr, hash) => {
        const secret = 'your-secret-key';
        const options = { expiresIn: '1h' };
        const payload = { email: email };
        const token = jwt.sign(payload, secret, options);
        // Create a new user
        await db.User.create({
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: hash,
          createdAt: new Date() // Invoke now() to get the current timestamp
        }).then((resolve) => {

          res.status(200).json({
            token: token,
            message: "Registered and login successfully",
          }).catch(err => {
            res.json(err.message);
          });
        });
      });

      // Respond with the user's ID
      // return res.status(200).json({ message: 'Successfully registered', id: newUser.id });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const secret = 'your-secret-key';
    const options = { expiresIn: '1h' };
    const payload = { email: email };
    const token = jwt.sign(payload, secret, options);
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
    console.log(email, password)
  } catch (error) {
    return { success: false, error: error.message };
  }

}
module.exports = { register, login };