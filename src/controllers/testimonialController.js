const express = require('express');
const db = require('../models');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(bodyParser.json());

const createTestimonial = async (req, res) => {
    const { description } = req.body;

    await db.Testimonial.create({
        userId: req.user.id,
        testimonial_img: req.file.filename, // Assuming you're storing the filename in the database
        description: description
    });
    res.status(200).json({
        message: "Your form has been submited",
    });
}

const readTestimonial = async (req, res) => {
    try {
        const testimonial = await db.Testimonial.findAll({
            where: {
                user_id: req.user.id
            },
            include: 'User' // Include the User model in the query
        });

        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        // Testimonial found, send it in the response
        res.json({ testimonial });
    } catch (error) {
        console.error('Error reading testimonial:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const editTestimonial = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params to access route parameters
        const testimonial = await db.Testimonial.findOne({
            where: {
                id: id,
                user_id: req.user.id
            },
            include: 'User' // Include the User model in the query
        });
        res.json({ testimonial })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params; // Extract testimonial ID from request parameters
        const { description } = req.body;
        const testimonialImg = req.file; // Extract selected fields from request body
        // Find the testimonial by ID and user ID
        let testimonial = await db.Testimonial.findOne({
            where: {
                id: id,
                userId: req.user.id // Assuming you have user information stored in req.user
            }
        });

        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        // Update only selected fields
        if (testimonialImg) {

            if (testimonial.testimonial_img) {
                const filePath = path.join(__dirname, '../asset/uploads', testimonial.testimonial_img);
                fs.unlinkSync(filePath);
            }
            testimonial.testimonial_img = testimonialImg.filename;
        }
        if (description) {
            testimonial.description = description;
        }
        // Save the updated testimonial
        testimonial = await testimonial.save();

        // Return the updated testimonial in the response
        res.json({ testimonial });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params; // Extract testimonial ID from request parameters

        // Find the testimonial by ID and user ID
        let testimonial = await db.Testimonial.findOne({
            where: {
                id: id,
                userId: req.user.id // Assuming you have user information stored in req.user
            }
        });

        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        // Get the filename of the uploaded file
        const filename = testimonial.testimonial_img;
        // Delete the testimonial from the database
        await testimonial.destroy();

        // Delete the corresponding file from the folder
        if (filename) {
            const filePath = path.join(__dirname, '../asset/uploads', filename);
            fs.unlinkSync(filePath);
        }

        return res.status(200).json({ "message": "deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
};


module.exports = { createTestimonial, readTestimonial, editTestimonial, updateTestimonial, deleteTestimonial };