const express = require('express');
const db = require('../models');
const bodyParser = require('body-parser');
const userpermission = require('../models/userpermission');
const app = express();
app.use(bodyParser.json());

const addModule = async (req, res) => {
    console.log("hgeldo");
    try {
        console.log("hgeldo");
        const { name, url, status } = req.body;

        await db.Module.create({
            name: name,
            url: url, // Assuming you're storing the filename in the database
            status: status
        });
        res.status(200).json({
            message: "Your form has been submited",
        });
    } catch (error) {
        return res.status(404).json({ error: "module is not added" });
    }
}
const listAdminModule = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await db.User.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(401).json({ error: 'Contact to support' });
        }
        const modules = await db.Module.findAll({include:db.User});
        return res.status(200).json({modules});
    } catch (error) {
        return res.status(500).json({ error: "Error is "+error });
    }
}
const listUserModule = async (req, res) => {
    try {
        const modules = db.Module.findAll();
        return res.status(200).json(modules);
    } catch (error) {
        return res.status(404);
    }
}

module.exports = { listAdminModule, addModule, listUserModule }
