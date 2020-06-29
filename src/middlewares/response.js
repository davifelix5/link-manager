
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

const TYPE_JSON = 'application/json'
const STATUS_CODE_OK = 200
const STATUS_CODE_BAD_REQUEST = 400
const STATUS_CODE_UNAUTHORIZED = 401
const STATUS_CODE_NOT_FOUND = 404
const STATUS_CODE_SERVER_ERROR = 500

module.exports = (req, res, next) => {

    const creator = new ResponseCreator(res)

    creator.createPattern('jsonOK', STATUS_CODE_OK, 'Successful request!')
    creator.createPattern('jsonBadRequest', STATUS_CODE_BAD_REQUEST, 'Bad request!')
    creator.createPattern('jsonUnauthorized', STATUS_CODE_UNAUTHORIZED, 'You are not allowed to do this!!')
    creator.createPattern('jsonNotFound', STATUS_CODE_NOT_FOUND, 'Not found!')
    creator.createPattern('jsonServerError', STATUS_CODE_SERVER_ERROR, 'Sorry, a server error has accured!')

    next() // Sinaliza que o middleware acabou e a execução pode continuar
}