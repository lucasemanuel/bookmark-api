const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Link = sequelize.define(
  'link',
  {
    title: DataTypes.STRING,
    url: DataTypes.STRING
  },
  {
    sequelize
  }
)

module.exports = Link
