const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('List', listSchema)