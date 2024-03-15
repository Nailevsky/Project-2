const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, required: true }
})


module.exports = mongoose.model('Job', jobSchema)