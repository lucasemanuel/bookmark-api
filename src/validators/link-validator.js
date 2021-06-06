const { body, check } = require('express-validator')

module.exports = {
  store: [
    body('title')
      .trim()
      .isLength({
        max: 255
      })
      .not()
      .isEmpty(),
    body('url')
      .blacklist(' ')
      .isLength({
        max: 255
      })
      .not()
      .isEmpty(),
    check('tags.*').isAlphanumeric()
  ],
  update: [
    body('title').isLength({
      max: 255
    }),
    body('url')
      .blacklist(' ')
      .isLength({
        max: 255
      })
  ]
}
