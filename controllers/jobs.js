const express = require('express');
const router = express.Router();
const db = require('../models');

// I.N.D.U.C.E.S.
// Index List all jobs
router.get('/', async (req, res) => {
    const jobs = await db.Job.find({});
    res.render('jobs-list', { jobs: jobs });
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

// Update a job
router.post('/update-finish-date/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { newFinishDate } = req.body;
        await db.Job.findByIdAndUpdate(id, { finishDate: newFinishDate });
        res.redirect(`/jobs/${id}`); // Redirect back to the job page
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating finish date');
    }
});

// Create a new job
router.post('/create', async (req, res) => {
    try {
        const { jobName, jobAddress, category, startDate, finishDate } = req.body;
        const newJob = await db.Job.create({
            name: jobName,
            address: jobAddress,
            user: req.session.currentUser._id,
            category: category,
            startDate,
            finishDate
        });
        res.redirect('/jobs');
    } catch (err) {
        console.error(err);
        res.send('Error creating new job');
    }
});

router.get('/:id', async (req, res) => {
    const job = await db.Job.findById(req.params.id);
    const tools = await db.Tool.find({ category: job.category });
    res.render('job', { job: job, tools: tools });
});

module.exports = router;