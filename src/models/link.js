'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    static associate (models) {
      Link.belongsToMany(models.Tag, {
        through: 'LinkTags',
        as: 'tags',
        foreignKey: 'linkId'
      })
    }
  }
  Link.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Link'
    }
  )
  return Link
}
