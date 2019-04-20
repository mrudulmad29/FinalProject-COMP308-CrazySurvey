let mongoose = require('mongoose');

// create a model class
let questionSchema = mongoose.Schema({
    question: String,
    // option1: String,
    // option2: String,
    // option3: String,
    // option4: String
    
},
{
    collection: "first"
});

module.exports = mongoose.model('question', questionSchema);