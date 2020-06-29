const express = require('express')
const db = require('./models')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const authController = require('./controllers/auth')

// Calls the controller routers when '/auth' is accessed
app.use('/auth', authController)

app.get('/', (req, res) => {
    return res.json({
        success: true
    })
})

db.sequelize.sync().then(() => {
    app.listen(3333, () => {
        console.log('App lintening on port 3333')
    })
})

