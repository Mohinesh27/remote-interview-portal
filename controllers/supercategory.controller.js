const SuperCategory = require('../models/supercategory.model.js');

// Create and Save a new supercategory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Supercategory content can not be empty"
        });
    }

    // Create a supercategory
    const supercategory = new SuperCategory({
        title: req.body.title || "Untitled supercategory",
        content: req.body.content
    });

    // Save supercategory in the database
    supercategory.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the supercategory."
            });
        });
};

// Retrieve and return all supercategorya from the database.
exports.findAll = (req, res) => {
    SuperCategory.find()
        .then(supercategories => {
            res.send(supercategories);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving supercategories."
            });
        });
};

// Find a single supercategory with a id
exports.findOne = (req, res) => {
    SuperCategory.findById(req.params.id)
        .then(supercategory => {
            if (!supercategory) {
                return res.status(404).send({
                    message: "Supercategory not found with id " + req.params.id
                });
            }
            res.send(supercategory);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Supercategory not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Supercategory with id " + req.params.id
            });
        });
};

// Update a supercategory identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Supercategory content can not be empty"
        });
    }

    // Find Supercategory and update it with the request body
    SuperCategory.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled supercategory",
        content: req.body.content
    }, { new: true })
        .then(supercategory => {
            if (!supercategory) {
                return res.status(404).send({
                    message: "supercategory not found with id " + req.params.id
                });
            }
            res.send(supercategory);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "supercategory not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating supercategory with id " + req.params.id
            });
        });
};

// Delete a supercategory with the specified id in the request
exports.delete = (req, res) => {
    SuperCategory.findByIdAndRemove(req.params.id)
        .then(supercategory => {
            if (!supercategory) {
                return res.status(404).send({
                    message: "supercategory not found with id " + req.params.id
                });
            }
            res.send({ message: "supercategory deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "supercategory not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete supercategory with id " + req.params.id
            });
        });
};