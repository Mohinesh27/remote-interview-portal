const mongoose = require('mongoose');

const SuperCategorySchema = mongoose.Schema({
    title:String,
    content:String
}, {
    timestamps: true
});

module.exports = mongoose.model('SuperCategory', SuperCategorySchema);