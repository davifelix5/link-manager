const Joi = require('@hapi/joi');
const { formatErrors } = require('../../helpers/validator')

module.exports = {
    accountSignUp: (req, res, next) => {

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
            passwordConfirmation: Joi.string().valid(Joi.ref('password')).required()
        })

        const result = schema.validate(req.body, { abortEarly: false })
        const { error } = result
        if (error) {
            return res.jsonBadRequest({ metadata: { errors: formatErrors(error, 'account.signup') } })
        }

        next()
    }
}
