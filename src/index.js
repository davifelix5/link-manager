const express = require('express')
const db = require('./models')
const responseMiddleware = require('./middlewares/response')

const app = express()
const authController = require('./controllers/auth')

// MIDDLEWARES: executam o código antes de prosseguir com a execução do código

app.use(responseMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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

