const express = require('express')
const accountController = require('./controllers/accountController')
const { accountSignUp, accountSignIn } = require('../validators/auth/account')

const router = express.Router()

// accountSignIn é um middleware: a requisição vai passar por ele antes
router.post('/sign-in', accountSignIn, accountController.login)

router.post('/sign-up', accountSignUp, accountController.create)

module.exports = router
