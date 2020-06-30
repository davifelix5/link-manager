const { Link } = require('../../models')
const { getMessage } = require('../../helpers/messages')
const { get } = require('../../auth/routes')

module.exports = {

    create: async (req, res) => {
        const { accountId, body } = req
        const { label, url, isSocial } = body
        const image = 'htpps:/google.com/image.jpg'

        const newLink = await Link.create({ label, url, isSocial, accountId, image })

        return res.jsonOK({
            msg: getMessage('links.create.success'),
            data: newLink,
        })
    },

    list: async (req, res) => {

        const { accountId } = req

        const links = await Link.findAll({ where: { accountId } })

        if (links.length === 0) return res.jsonNotFound({ msg: getMessage('links.list.notFound') })

        return res.jsonOK({ data: links, msg: getMessage('links.list.success') })
    },

    show: async (req, res) => {
        const { id } = req.params
        const { accountId } = req

        const link = await Link.findOne({ where: { id, accountId } })

        if (!link) return res.jsonNotFound({ msg: getMessage('links.show.notFound') })

        return res.jsonOK({ data: link, msg: getMessage('links.show.success') })
    },

    update: async (req, res) => {
        const { body, accountId } = req
        const editableFields = ['label', 'url', 'isSocial']

        const { id } = req.params

        const link = await Link.findOne({ where: { id, accountId } })
        if (!link) return res.jsonNotFound({ msg: getMessage('links.show.notFound') })

        editableFields.forEach(fieldName => {
            const newValue = body[fieldName]
            if (newValue !== undefined) link[fieldName] = newValue
        })

        await link.save()

        return res.jsonOK({
            msg: getMessage('links.create.success'),
            data: link,
        })
    },

    delete: async (req, res) => {
        const { accountId } = req
        const { id } = req.params
        const link = await Link.findOne({ where: { id, accountId } })

        if (!link) return res.jsonNotFond({ msg: getMessage('links.show.notFound') })

        await link.destroy()

        return res.jsonOK({ data: link, msg: getMessage('links.delete.success') })
    }

}