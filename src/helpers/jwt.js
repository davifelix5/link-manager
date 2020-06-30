require('dotenv').config()

const jwt = require('jsonwebtoken')

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY
const options = {
    expiresIn: '30 minutes'
}
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE
const refreshOptions = {
    expiresIn: '30 days'
}

module.exports = {

    generateJwt: payload => jwt.sign(payload, tokenPrivateKey, options),

    generateRefreshJwt: payload => jwt.sign(payload, refreshTokenPrivateKey, refreshOptions),

    verifyJwt: token => jwt.verify(token, tokenPrivateKey),

    verifyRefreshJwt: token => jwt.verify(token, refreshTokenPrivateKey),

    getTokenFromHeaders: headers => {
        const token = headers['authorization']
        return token ? token.slice(7, token.length) : null
    }

}
