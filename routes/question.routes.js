module.exports = (app) => {
    const questions = require('../controllers/question.controller.js');

    // Create a new Question
    app.post('/questions', questions.create);

    // Retrieve all Questions
    app.get('/questions', questions.findAll);

    // Retrieve a single Question with id
    app.get('/questions/:id', questions.findOne);

    // Update a Question with id
    app.put('/questions/:id', questions.update);

    // Delete a Question with id
    app.delete('/questions/:id', questions.delete);
}