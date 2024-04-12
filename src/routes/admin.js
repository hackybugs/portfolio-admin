const express = require("express");
const router = express.Router();
const upload = require('../middlewares/upload');
const { createTestimonial, readTestimonial, editTestimonial, updateTestimonial, deleteTestimonial} = require("../controllers/testimonialController");
const {addModule,listAdminModule} = require("../controllers/moduleController");
router.post("/create",upload.single('testimonial_img'),createTestimonial);
router.get("/", readTestimonial);
router.get("/:id/edit", editTestimonial);
router.delete("/:id/delete",deleteTestimonial);
router.patch("/:id/update", upload.single('testimonial_img'),updateTestimonial);
//routes for modules
router.post("/add-module",addModule);
router.get("/view-modules",listAdminModule);
module.exports = router;