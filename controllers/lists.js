// All routes on this page are prefixed with `localhost:3000/lists`
// Require modules
const express = require('express');
const router = express.Router(); // Router allows us to handle routing outside of server.js
const db = require('../models'); // Require the db connection and models

// I.N.D.U.C.E.S

// INDEX - Get all items from the database and send them to the user
router.get('/', (req, res) => {
    db.Tool.find({})
        .then(tools => {
            res.render('list-home', {tools: tools});
        });
});


// DELETE - Remove a tool from the database
router.delete('/:category/:id', (req, res) => {
    db.Tool.findByIdAndDelete(req.params.id)
        .then(() => res.redirect(`/lists/${req.params.category}`));
});

// UPDATE - Modify an existing tool in the database
router.put('/:category/:id', (req, res) => {
    db.Tool.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category
    }, { new: true })
    .then(() => res.redirect(`/lists/${req.params.category}`))
    .catch(err => res.send(err));
});

// CREATE - Add a new tool to the database
router.post('/:category/new', (req, res) => {
    db.Tool.create({
        name: req.body.name,
        category: [req.params.category],
        checked: false
    })
    .then(() => res.redirect(`/lists/${req.params.category}`))
    .catch(err => res.send(err));
});

// EDIT - Display form to edit an existing tool (handled in the view)
router.get('/:category/:id/edit', (req, res) => {
    db.Tool.findById(req.params.id)
        .then(tool => {
            res.render('edit-tool', {tool: tool, category: req.params.category});
        })
        .catch(err => res.render('404'));
});

// SHOW - Display a single category with its tools
router.get('/:category', (req, res) => {
    db.Tool.find({category: {$in: [req.params.category]}})
        .then(tools => {
            res.render('list', {tools: tools, category: req.params.category});
        });
});

module.exports = router;
