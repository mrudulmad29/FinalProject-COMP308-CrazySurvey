let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

// create a reference to the db schema
let questionModel = require('../models/question');

module.exports.displayQuestionList = (req, res, next) =>{
    questionModel.find((err, questionList) => {
        if(err) {
            return console.error(err);
        }
        else {
           res.json({success: true, msg: 'question List Displayed Successfully', questionList: questionList, user: req.user});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.json({success: true, msg: 'Successfully Displayed Add Page'});
}

module.exports.processAddPage = (req, res, next) => {

    let newQuestion = questionModel({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "age": req.body.age
    });

    questionModel.create(newQuestion, (err, questionModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({success: true, msg: 'Successfully Added New question'});
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    questionModel.findById(id, (err, questionObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Displayed question to Edit', question: questionObject});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedQuestion = questionModel({
        "_id": id,
        "question": req.body.question,
        "option1": req.body.option1,
        "option2": req.body.option2,
        "option3": req.body.option3,
        "option4": req.body.option4
    });

    questionModel.update({_id: id}, updatedQuestion, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({success: true, msg: 'Successfully Edited question', question: updatedQuestion});
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    questionModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({success: true, msg: 'Successfully Deleted question'});
        }
    });
}

