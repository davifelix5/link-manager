const { getMessage } = require('../../helpers/messages')
const { hashSync } = require('bcrypt')
const { Account } = require('../../models')

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

        return res.jsonOK({ data: newAccount, msg: getMessage('account.signup.accountCreated') })

    },

    login: (req, res) => {
        return res.jsonNotFound()
    }
}