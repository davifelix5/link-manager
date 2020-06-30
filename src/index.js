const express = require('express')
const db = require('./models')
const router = require('./routes')

const responseMiddleware = require('./middlewares/response')
const checkJwt = require('./middlewares/jwt')

const app = express()

// MIDDLEWARES: executam o código antes de prosseguir com a execução do código

// Padrozina as respostas
app.use(responseMiddleware)
// Verifica a autenticação
app.use(checkJwt)
// Capacidade de ler dados em JSON format
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Rotas do meu projeto
app.use(router)

db.sequelize.sync().then(() => {
    app.listen(3333, () => {
        console.log('App listening on port 3333')
    })
})
