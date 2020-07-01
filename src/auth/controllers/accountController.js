const { getMessage } = require('../../helpers/messages')
const { hashSync, compareSync } = require('bcrypt')
const { Account } = require('../../models')
const {
    generateJwt,
    generateRefreshJwt,
    getTokenFromHeaders,
    verifyRefreshJwt,
    getCredentials
} = require('../../helpers/jwt')

module.exports = {
    create: async (req, res) => {

        const saltRounds = 10

        const { email, password } = req.body

        const accountWithEmail = await Account.findOne({ where: { email } })
        if (accountWithEmail) {
            return res.jsonBadRequest({ msg: getMessage('account.signup.existingEmail') })
        }

        const hashPassword = hashSync(password, saltRounds)
        const newAccount = await Account.create({ email, password: hashPassword })

        const token = generateJwt({ id: newAccount.id })
        const refreshToken = generateRefreshJwt({ id: newAccount.id, version: newAccount.jwtVersion })

        return res.jsonOK({
            data: newAccount,
            msg: getMessage('account.signup.accountCreated'),
            metadata: { token, refreshToken }
        })

    },

    login: async (req, res) => {

        const [email, password] = getCredentials(req.headers.authorization)

        const accountWithEmail = await Account.findOne({ where: { email } })
        const match = accountWithEmail ? compareSync(password, accountWithEmail.password) : null

        if (!match) return res.jsonBadRequest({ msg: getMessage('account.signin.invalid') })

        const token = generateJwt({ id: accountWithEmail.id })
        const refreshToken = generateRefreshJwt({
            id: accountWithEmail.id,
            version: accountWithEmail.jwtVersion
        })

        return res.jsonOK({
            data: accountWithEmail,
            metadata: { token, refreshToken },
            msg: getMessage('account.signin.success')
        })

    },

    getTokenFromRefresh: async (req, res) => {
        const token = getTokenFromHeaders(req.headers)
        console.log(token)
        try {
            const decodedToken = verifyRefreshJwt(token)

            const account = await Account.findByPk(decodedToken.id)
            if (!account || decodedToken.version !== account.jwtVersion)
                return res.jsonUnauthorized({ msg: getMessage('jwt.invalidToken') })

            const metadata = {
                token: generateJwt({ id: account.id })
            }

            return res.jsonOK({ metadata })

        } catch {
            return res.jsonUnauthorized({ msg: getMessage('jwt.invalidToken') })
        }
    }
}