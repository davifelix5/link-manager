const { getMessage } = require('../../helpers/messages')
const { hashSync, compareSync } = require('bcrypt')
const { Account } = require('../../models')
const { generateJwt, generateRefreshJwt } = require('../../helpers/jwt')

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
        const refreshToken = generateRefreshJwt({ id: newAccount.id })

        return res.jsonOK({
            data: newAccount,
            msg: getMessage('account.signup.accountCreated'),
            metadata: { token, refreshToken }
        })

    },

    login: async (req, res) => {

        const { email, password } = req.body

        const accountWithEmail = await Account.findOne({ where: { email } })
        const match = accountWithEmail ? compareSync(password, accountWithEmail.password) : null

        if (!match) return res.jsonBadRequest({ msg: getMessage('account.signin.invalid') })

        const token = generateJwt({ id: accountWithEmail.id })
        const refreshToken = generateRefreshJwt({ id: accountWithEmail.id })

        return res.jsonOK({
            account: accountWithEmail,
            metadata: { token, refreshToken },
            msg: getMessage('account.signin.success')
        })

    }
}