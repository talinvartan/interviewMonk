var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports.TestModel = mongoose.model('Test', {
    title: String,
    questions: Mixed,
    userAnswers: Mixed,
    user: Mixed
});