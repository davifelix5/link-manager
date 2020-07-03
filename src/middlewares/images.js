const { Link } = require('../models')

const checkImage = async (req, res, next) => {

    const { accountId, url } = req

    const imageName = url.split('/').slice(-1)
    const link = await Link.findOne({ where: { image: imageName } })

    if (!link || link.accountId !== accountId)
        return res.jsonNotFound({ msg: 'Essa imagem não exite' })

    return next()

}

module.exports = checkImage
