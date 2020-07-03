const express = require('express')
const multer = require('multer')
const multerConfig = require('../config/multerConfig')

const linksController = require('./controllers/linksController')

const upload = multer(multerConfig)

const router = express.Router()

router.post('/add-link', upload.single('image'), linksController.create) // C
router.get('/', linksController.list) // R
router.get('/:id', linksController.show) // R
router.put('/:id', linksController.update) // U
router.delete('/:id', linksController.delete) // D
module.exports = router
