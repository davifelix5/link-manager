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

router.get('/sign-up', async (req, res) => {

    const email = 'salvesalve@gmail.com';
    const password = 'salvesalve'
    const hashPassword = hashSync(password, saltRounds)

    const result = await Account.create({ email, password: hashPassword })

    return res.json(result)

})

module.exports = router
