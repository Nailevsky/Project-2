// Tools model
const mongoose = require('mongoose');
const toolSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: [{type: String, required: true}],
    checked: {type: Boolean, default: false}
});


module.exports = mongoose.model("Tool", toolSchema)