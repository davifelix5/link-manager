const { verifyJwt, getTokenFromHeaders } = require('../helpers/jwt')
const { getMessage } = require('../helpers/messages')

const checkJwt = (req, res, next) => {

    const { url } = req

    const excludedPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/refresh']

    const excluded = Boolean(excludedPaths.find(path => path.startsWith(url)))

    if (excluded) return next()

    const token = getTokenFromHeaders(req.headers)

    if (!token) {
        return res.jsonUnauthorized({ msg: getMessage('jwt.invalidToken') })
    }

    try {
        const decodedToken = verifyJwt(token)
        req.accountId = decodedToken.id
        // console.log('Token expires in: ' + new Date(decodedToken.exp * 1000).toString())
        next()
    } catch {
        return res.jsonUnauthorized({ msg: getMessage('jwt.invalidToken') })
    }

}

module.exports = checkJwt

