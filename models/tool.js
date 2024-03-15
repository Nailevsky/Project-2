const mongoose = require('mongoose');
const toolSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: [{type: String, required: true}],
    checked: {type: Boolean, default: false},
    user: { type: mongoose.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model("Tool", toolSchema)