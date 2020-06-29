const { getMessage } = require('./messages')

const formatErrors = (error, messagePath) => {

    const errorsDetails = error.details

    const errorMessages = {}
    errorsDetails.forEach(error => {
        const { context: { key }, type, message } = error

        const path = `${messagePath}.${key}.${type}`

        errorMessages[key] = { message: getMessage(path) || message }
    })

    return errorMessages

}

module.exports = { formatErrors, getMessage }
