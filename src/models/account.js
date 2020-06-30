module.exports = (sequelize, DataTypes) => {

    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Account.associate = models => {
        Account.hasMany(models.Link, { foreignKey: 'accountId' })
    }

    // Removing the password field from the return JSON after insertion
    Account.prototype.toJSON = function () {
        const values = { ...this.get() }
        delete values.password
        return values
    }

    return Account

}