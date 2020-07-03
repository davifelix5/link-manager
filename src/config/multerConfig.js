const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            const destination = path.resolve(__dirname, '..', '..', 'uploads')
            callback(null, destination)
        },
        filename: (req, file, callback) => {
            const hash = crypto.randomBytes(5).toString('hex')
            const newFileName = `${hash}-${file.originalname}`
            callback(null, newFileName)
        }
    }),
    fileFilter: (req, file, callback) => {
        const extension = path.extname(file.originalname)
        const allowedExtensions = ['.png', '.jpg', '.jpeg']
        const allAllowed = allowedExtensions.filter(ext => ext === extension)

        return allAllowed.length === 0
            ?
            callback(new Error('Apenas imagens são permitidas'))
            :
            callback(null, true)
    }
}

