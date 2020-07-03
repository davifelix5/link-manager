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
        const authorization = headers['authorization'] ? headers['authorization'] : null
        if (!authorization) return false
        const [, token] = authorization.split(' ')
        return token
    },

    getCredentials: header => {
        const [, hash] = header.split(' ')
        return Buffer.from(hash, 'base64').toString().split(':')
    }

}
