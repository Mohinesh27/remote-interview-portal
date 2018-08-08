module.exports = (app) => {
    const supercategories = require('../controllers/supercategory.controller.js');

    // Create a new supercategory
    app.post('/supercategories', supercategories.create);

    // Retrieve all supercategories
    app.get('/supercategories', supercategories.findAll);

    // Retrieve a single supercategory with id
    app.get('/supercategories/:id', supercategories.findOne);

    // Update a supercategory with id
    app.put('/supercategories/:id', supercategories.update);

    // Delete a supercategory with id
    app.delete('/supercategories/:id', supercategories.delete);
}