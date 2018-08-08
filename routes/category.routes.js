module.exports = (app) => {
    const categories = require('../controllers/supercategory.controller.js');

    // Create a new supercategory
    app.post('/categories', categories.create);

    // Retrieve all categories
    app.get('/categories', categories.findAll);

    // Retrieve a single supercategory with id
    app.get('/categories/:id', categories.findOne);

    // Update a supercategory with id
    app.put('/categories/:id', categories.update);

    // Delete a supercategory with id
    app.delete('/categories/:id', categories.delete);
}