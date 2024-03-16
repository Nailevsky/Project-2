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
    await db.Job.findByIdAndDelete(req.params.id);
    res.redirect('/jobs');
});

// Update a job
router.post('/update-finish-date/:id', async (req, res) => {
    const { id } = req.params;
    const { newFinishDate } = req.body;
    await db.Job.findByIdAndUpdate(id, { finishDate: newFinishDate });
    res.redirect(`/jobs/${id}`); // Redirect back to the job page
});

// Create a new job
router.post('/create', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
    const job = await db.Job.findById(req.params.id);
    const tools = await db.Tool.find({ category: job.category });
    res.render('job', { job: job, tools: tools });
});

module.exports = router;