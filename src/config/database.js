require('dotenv').config()

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env

module.exports = {
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialect: 'mysql',
  host: DB_HOST,
  define: {
    timestamps: true,
    underscored: true
  }
}
