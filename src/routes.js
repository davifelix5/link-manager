const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/routes')
const linkRouter = require('./links/routes')

router.use('/auth', authRoutes)

router.use('/links', linkRouter)

module.exports = router
