const express = require('express')
const { hashSync } = require('bcrypt')
const { Account } = require('../models')

const router = express.Router()

const saltRounds = 10  // amount of times the encryption is going to run

router.get('/sign-in', (req, res) => {
    return res.json({
        action: 'Sign In'
    })
})

router.post('/sign-up', async (req, res) => {

    const { email, password } = req.body

    const accountWithEmail = await Account.findOne({ where: { email } })
    if (accountWithEmail) {
        return res.jsonBadRequest({ msg: 'Email already registered' })
    }

    const hashPassword = hashSync(password, saltRounds)
    const newAccount = await Account.create({ email, password: hashPassword })

    return res.jsonOK({ data: newAccount, msg: 'Account created successfully' })

})

module.exports = router
