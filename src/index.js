const express = require('express')

const app = express()

app.get('/', (req, res) => {
    return res.json({})
})

app.listen(3333, () => {
    console.log('App lintening on port 3333')
})
