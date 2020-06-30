const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/routes')
const linkRouter = require('./links/routes')

// Calls the controller routers when '/auth' is accessed
router.use('/auth', authRoutes)

router.use('/links', linkRouter)

router.get('/', (req, res) => {
    return res.json({
        success: true
    })
})

module.exports = router
