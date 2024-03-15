const express = require('express');
const router = express.Router();
const db = require('../models');

// I.N.D.U.C.E.S.
// Index List all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await db.Job.find({}).populate('list');
        res.render('jobs-list', { jobs: jobs });
    } catch (err) {
        console.error(err);
        res.render('404');
    }
});

// Display the form for a new job
router.get('/new/:category', async (req, res) => {
    const category = req.params.category;
    const tools = await db.Tool.find({ category: category });
    res.render('new-job', { category: category, tools: tools });
});

// Delete a job
router.delete('/:id', async (req, res) => {
    try {
        await db.Job.findByIdAndDelete(req.params.id);
        res.redirect('/jobs');
    } catch (err) {
        console.error(err);
        res.render('404');
    }
});

// Update (U) - [Placeholder for future update route, if needed]

// Create a new job and associated list
router.post('/create', (req, res) => {
    const { jobName, jobAddress, category } = req.body;
    db.List.create({ name: jobName, user: req.session.currentUser._id })
        .then(newList => {
            return db.Job.create({
                name: jobName,
                address: jobAddress,
                list: newList._id,
                user: req.session.currentUser._id,
                category: category
            });
        })
        .then(newJob => {
            res.redirect('/jobs');
        })
        .catch(err => {
            console.error(err);
            res.send('Error creating new job');
        });
});
// Edit (E) - [Placeholder for future edit route, if needed]

// Show a specific job
router.get('/:id', async (req, res) => {
    try {
        const job = await db.Job.findById(req.params.id).populate('list');
        const tools = await db.Tool.find({ category: job.category });
        res.render('job', { job: job, tools: tools });
    } catch (err) {
        console.error(err);
        res.render('404');
    }
});

module.exports = router;
