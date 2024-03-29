const express = require("express");
const router = express.Router();

const { register,login,logout } = require("../controllers/usercontroller");
//const auth = require("../middlewares/auth");
const { validRegister, validLogin } = require("../middlewares/userValidation");


router.post("/register", validRegister, register);

router.post("/login", validLogin, login);
router.post("/logout", logout);

// router.put("/reset-password",validResetPassword, resetPassword); // password update 

// router.post("/forgot-password", validEmail, forgotPassword);     // while user forgot password

// router.post("/verify-otp",validOtp, verifyOtp);           //verify otp to change password

// router.post("/change-password",auth,validChangePassword, changePassword);      // while user login and want to change password

// router.get("/profile",auth, profile);       //user profile

// router.post("/edit-profile",auth, editProfile);     //edit profile

// router.get("/contact-us",auth, contactUs );     //

// router.post("/contact-us-form", contactUsForm );     //

// router.get("/about",auth, about );     //
// router.post("/a", a );     //


module.exports = router;