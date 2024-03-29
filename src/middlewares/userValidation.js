// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

const validRegister = (req, res, next) => {
    try {

        const { lastname, firstname, email, password } = req.body;

        const emailRegexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let result = emailRegexp.test(email)
        if (Object.keys(req.body).length === 0) {
            return res.json({ "ERROR": "emptyFields" + email });
        } else if (email === null && email.trim() == "" || Object.keys(req.body).length === 0) {
            return res.json({ "ERROR": "emptyFields" + email });
        } else if (!result) {
            return res.json({ "ERROR": "Invalid Email" + email });
        } else if (password == null || password.trim() == "") {
            return res.json({ "ERROR": "Enter Password" + password });
        } else {
            return next();
        };
    } catch (err) {
        console.log(err);
    }
}
const validLogin = (req,res, next) => {
    try {
        const { email, password } = req.body;
        
        if (Object.keys(req.body).length === 0) {
            return res.json({ "ERROR": "emptyFields" });
        } 
        // Check if email is missing or empty
        if (!email || email.trim() === "") {
            return res.json({ "ERROR": "emptyEmail" });
        } 
        // Check if password is missing or empty
        if (!password || password.trim() === "") {
            return res.json({ "ERROR": "emptyPassword" });
        } else {
            return next();
        };
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "ERROR": "Internal Server Error" });
    }
}
module.exports = { validRegister, validLogin };