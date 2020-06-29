const express = require('express')

const router = express.Router()

router.get('/sign-in', (req, res) => {
    return res.json({
        action: 'Sign In'
    })
})

router.get('/sign-up', (req, res) => {
    return res.json({
        action: 'Sign Up'
    })
})

module.exports = router
