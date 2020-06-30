const express = require('express')
const linksController = require('./controllers/linksController')

const router = express.Router()

router.post('/add-link', linksController.create) // C
router.get('/', linksController.list) // R
router.get('/:id', linksController.show) // R
router.put('/:id', linksController.update) // U
router.delete('/:id', linksController.delete) // D
module.exports = router
