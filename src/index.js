const express = require('express')
const cors = require('cors')
const path = require('path')
const db = require('./models')
const routes = require('./routes')

const responseMiddleware = require('./middlewares/response')
const checkJwt = require('./middlewares/jwt')

const app = express()

app.use(cors())

// MIDDLEWARES: executam o código antes de prosseguir com a execução do código
app.use(responseMiddleware) // Padrozina as respostas
app.use(checkJwt) // Verifica a autenticação
app.use(express.json()) // Capacidade de ler dados em JSON format
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
// MY ROUTES
app.use(routes)

// SERVER INITIALIZATION
db.sequelize.sync().then(() => {
    app.listen(3333, () => {
        console.log('App listening on port 3333')
    })
})
