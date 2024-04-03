const express = require("express");
const router = express.Router();
const admin = require("./admin");
const { register,login,logout,refreshToken} = require("../controllers/usercontroller");


//const auth = require("../middlewares/auth");
const { validRegister, validLogin ,validEmail } = require("../middlewares/userValidation");
const { authenticateToken } = require("../middlewares/authenticateToken");

router.post("/register", validRegister, register);
router.use("/testimonial",authenticateToken,admin);
router.post("/refresh",authenticateToken,refreshToken);
// router.post("/testimonial/create",authenticateToken,upload.single('testimonial_img'),create);
// router.get("/testimonial/",authenticateToken, readTestimonial);
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