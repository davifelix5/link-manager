const express = require('express')

const authController = require('./controllers/auth')

const app = express()

// Calls the controller routers when '/auth' is accessed
app.use('/auth', authController)

app.get('/', (req, res) => {
    return res.json({
        success: true
    })
})

app.listen(3333, () => {
    console.log('App lintening on port 3333')
})
