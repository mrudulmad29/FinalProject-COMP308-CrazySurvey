let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let passport = require('passport');

let questionController = require('../controllers/question');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET question List page - READ Operation */
router.get('/', passport.authenticate('jwt', {session: false}), questionController.displayQuestionList);

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add', passport.authenticate('jwt', {session: false}), questionController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add', passport.authenticate('jwt', {session: false}), questionController.processAddPage);

/* GET request - display the Edit page */
router.get('/edit/:id', passport.authenticate('jwt', {session: false}), questionController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), questionController.processEditPage);

/* GET request to perform the delete action */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), questionController.performDelete);

module.exports = router;