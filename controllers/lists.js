// controllers/lists.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const isAuthenticated = require('../controllers/isAuthenticated');

// Route to render the form for creating a new list
router.get('/new', isAuthenticated, (req, res) => {
    res.render('list', { currentUser: req.session.currentUser });
});

// Route to create a new list
router.post('/', isAuthenticated, async (req, res) => {
    const newList = new db.List({
        name: req.body.name,
        user: req.session.currentUser._id
    });
    await newList.save();
    res.redirect('/lists'); // Redirect to a page where you can view all lists
});

// Route to view all lists
router.get('/', isAuthenticated, async (req, res) => {
    const lists = await db.List.find({ user: req.session.currentUser._id }).populate('tools');
    res.render('list-home', { lists: lists, currentUser: req.session.currentUser });
});

// Route to add a tool to a list
router.post('/:listId/tools', isAuthenticated, async (req, res) => {
    const tool = await db.Tool.findById(req.body.toolId);
    await db.List.findByIdAndUpdate(req.params.listId, { $push: { tools: tool._id } });
    res.redirect(`/lists/${req.params.listId}`);
});

// Route to view a specific list
router.get('/:listId', isAuthenticated, async (req, res) => {
    const list = await db.List.findById(req.params.listId).populate('tools');
    res.render('list', { list: list, currentUser: req.session.currentUser });
});

module.exports = router;
