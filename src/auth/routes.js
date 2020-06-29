const express = require('express')
const accountController = require('./controllers/accountController')
const { accountSignUp } = require('../validators/auth/account')

const router = express.Router()

router.get('/sign-in', accountController.login)

// accountSignUp é um middleware: a requisição vai passar por ele antes
router.post('/sign-up', accountSignUp, accountController.create)

module.exports = router
