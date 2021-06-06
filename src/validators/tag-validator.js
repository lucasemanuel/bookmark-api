const { body } = require('express-validator')

module.exports = {
  store: [
    body('name')
      .isLength({ max: 255 })
      .notEmpty()
  ]
}
