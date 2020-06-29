
class ResponseCreator {

    constructor(response) {
        this.response = response
    }

    createPattern(functionName, statusCode, defaultMessage) {
        this.response[functionName] = ({ data, msg, metadata } = {}) => {
            const status = statusCode
            msg = (msg) ? msg : defaultMessage
            metadata = (metadata) ? metadata : {}
            data = (data) ? data : {}

            this.response.status(status);
            this.response.type(TYPE_JSON)
            return this.response.json({ data, msg, metadata, status: status })
        }
    }
}

const { getMessage } = require('../helpers/messages')

const TYPE_JSON = 'application/json'
const STATUS_CODE_OK = 200
const STATUS_CODE_BAD_REQUEST = 400
const STATUS_CODE_UNAUTHORIZED = 401
const STATUS_CODE_NOT_FOUND = 404
const STATUS_CODE_SERVER_ERROR = 500

module.exports = (req, res, next) => {

    const creator = new ResponseCreator(res)

    creator.createPattern('jsonOK', STATUS_CODE_OK, getMessage('response.ok'))
    creator.createPattern('jsonBadRequest', STATUS_CODE_BAD_REQUEST, getMessage('response.badRequest'))
    creator.createPattern('jsonUnauthorized', STATUS_CODE_UNAUTHORIZED, getMessage('response.unauthorized'))
    creator.createPattern('jsonNotFound', STATUS_CODE_NOT_FOUND, getMessage('response.notFound'))
    creator.createPattern('jsonServerError', STATUS_CODE_SERVER_ERROR, getMessage('response.serverError'))

    next() // Sinaliza que o middleware acabou e a execução pode continuar
}