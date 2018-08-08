const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    Question: String,
    Category: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', QuestionSchema);