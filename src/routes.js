const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/routes')

// Calls the controller routers when '/auth' is accessed
router.use('/auth', authRoutes)

router.get('/', (req, res) => {
    return res.json({
        success: true
    })
})

module.exports = router
