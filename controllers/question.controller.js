const Question = require('../models/question.model.js');

// Create and Save a new Question
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Question content can not be empty"
        });
    }

    // Create a Question
    const question = new Question({
        title: req.body.title || "Untitled question",
        content: req.body.content
    });

    // Save question in the database
    question.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the question."
            });
        });
};

// Retrieve and return all questiona from the database.
exports.findAll = (req, res) => {
    question.find()
        .then(supercategories => {
            res.send(supercategories);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving supercategories."
            });
        });
};

// Find a single question with a id
exports.findOne = (req, res) => {
   Question.findById(req.params.id)
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "question not found with id " + req.params.id
                });
            }
            res.send(question);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "question not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving question with id " + req.params.id
            });
        });
};

// Update a question identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "question content can not be empty"
        });
    }

    // Find question and update it with the request body
    Question.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Question",
        content: req.body.content
    }, { new: true })
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "question not found with id " + req.params.id
                });
            }
            res.send(question);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "question not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating question with id " + req.params.id
            });
        });
};

// Delete a question with the specified id in the request
exports.delete = (req, res) => {
    Question.findByIdAndRemove(req.params.id)
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "question not found with id " + req.params.id
                });
            }
            res.send({ message: "question deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "question not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete question with id " + req.params.id
            });
        });
};