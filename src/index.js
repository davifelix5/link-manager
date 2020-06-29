const express = require('express')
const db = require('./models')
const router = require('./routes')

const responseMiddleware = require('./middlewares/response')

const app = express()

// MIDDLEWARES: executam o código antes de prosseguir com a execução do código

app.use(responseMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

db.sequelize.sync().then(() => {
    app.listen(3333, () => {
        console.log('App listening on port 3333')
    })
})

