'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate (models) {
      Tag.belongsToMany(models.Link, {
        through: 'LinkTags',
        as: 'links',
        foreignKey: 'tagId'
      })
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Tag'
    }
  )
  return Tag
}
