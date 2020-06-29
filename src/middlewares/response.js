
const TYPE_JSON = 'application/json'
const STATUS_CODE_OK = 200
const STATUS_CODE_BAD_REQUEST = 400
const STATUS_CODE_UNAUTHORIZED = 401
const STATUS_CODE_NOT_FOUND = 404
const STATUS_CODE_SERVER_ERROR = 500

const jsonOK = function ({ data, msg, metadata }) {
    const status = STATUS_CODE_OK
    msg = (msg) ? msg : 'Successful request!'
    metadata = (metadata) ? metadata : {}
    data = (data) ? data : {}

    this.status(status);
    this.type(TYPE_JSON)
    return this.json({ data, msg, metadata, status: status })
}

const jsonBadRequest = function ({ data, msg, metadata }) {
    const status = STATUS_CODE_BAD_REQUEST
    msg = (msg) ? msg : 'Bad request!'
    metadata = (metadata) ? metadata : {}
    data = (data) ? data : {}

    this.status(status);
    this.type(TYPE_JSON)
    return this.json({ data, msg, metadata, status: status })
}

const jsonUnauthorized = function ({ data, msg, metadata }) {
    const status = STATUS_CODE_UNAUTHORIZED
    msg = (msg) ? msg : "You do not have permission to do this!"
    metadata = (metadata) ? metadata : {}
    data = (data) ? data : {}

    this.status(status);
    this.type(TYPE_JSON)
    return this.json({ data, msg, metadata, status: status })
}

const jsonNotFound = function ({ data, msg, metadata }) {
    const status = STATUS_CODE_NOT_FOUND
    msg = (msg) ? msg : "Not found!"
    metadata = (metadata) ? metadata : {}
    data = (data) ? data : {}

    this.status(status);
    this.type(TYPE_JSON)
    return this.json({ data, msg, metadata, status: status })
}

const jsonServerError = function ({ data, msg, metadata }) {
    const status = STATUS_CODE_SERVER_ERROR
    msg = (msg) ? msg : "Sorry, a server error has occured!"
    metadata = (metadata) ? metadata : {}
    data = (data) ? data : {}

    this.status(status);
    this.type(TYPE_JSON)
    return this.json({ data, msg, metadata, status: status })
}

module.exports = (req, res, next) => {

    res.jsonOK = jsonOK
    res.jsonBadRequest = jsonBadRequest
    res.jsonUnauthorized = jsonUnauthorized
    res.jsonNotFound = jsonNotFound
    res.jsonServerError = jsonServerError
    
    next() // Sinaliza que o middleware acabou e a execução pode continuar
}