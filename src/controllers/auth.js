const express = require('express')
const { getMessage } = require('../helpers/messages')
const { hashSync } = require('bcrypt')
const { Account } = require('../models')

const { accountSignUp } = require('../validators/account')

const router = express.Router()

const saltRounds = 10  // amount of times the encryption is going to run

router.get('/sign-in', (req, res) => {
    return res.jsonNotFound()
})

// accountSignUp é um middleware: a requisição vai passar por ele antes
router.post('/sign-up', accountSignUp, async (req, res) => {

    const { email, password } = req.body

    const accountWithEmail = await Account.findOne({ where: { email } })
    if (accountWithEmail) {
        return res.jsonBadRequest({ msg: getMessage('account.signup.existingEmail') })
    }

    const hashPassword = hashSync(password, saltRounds)
    const newAccount = await Account.create({ email, password: hashPassword })

    return res.jsonOK({ data: newAccount, msg: getMessage('account.signup.accountCreated') })

})

module.exports = router
