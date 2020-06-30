const Joi = require('@hapi/joi');
const { formatErrors } = require('../../helpers/validator')

const validationRules = {
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    passwordConfirmation: Joi.string().valid(Joi.ref('password')).required()
}

const validationOptions = { abortEarly: false }

module.exports = {

    accountSignIn: (req, res, next) => {

        // Definindo especificamente essas variáveis, ele apenas ignora as chaves desconhecidas,
        // não gerando um erro
        const { email, password } = req.body

        const schema = Joi.object({
            email: validationRules.email,
            password: validationRules.password,
        })

        const result = schema.validate({ email, password }, validationOptions)
        const { error } = result
        if (error) {
            return res.jsonBadRequest({ metadata: { errors: formatErrors(error, 'account.signin') } })
        }

        next()
    },

    accountSignUp: (req, res, next) => {

        const { email, password, passwordConfirmation } = req.body

        const schema = Joi.object({
            email: validationRules.email,
            password: validationRules.password,
            passwordConfirmation: validationRules.passwordConfirmation
        })

        const result = schema.validate({ email, password, passwordConfirmation }, validationOptions)
        const { error } = result
        if (error) {
            return res.jsonBadRequest({ metadata: { errors: formatErrors(error, 'account.signup') } })
        }

        next()
    }
}
