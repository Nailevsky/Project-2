const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt');

// 1) New User form
router.get('/new', (req, res) => {
    res.render('users/newUser', {currentUser: req.session.currentUser})
})
// 2) Post route to create user
router.post('/', async (req, res) => {
    // 1) hash the password
    console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    // 2) create the user
    const newUser = await db.User.create(req.body) // req.body has form data to create new user
    console.log(newUser)
    res.redirect('/')
})  

module.exports = router