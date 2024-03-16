const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, required: true },
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: false }
})


module.exports = mongoose.model('Job', jobSchema)