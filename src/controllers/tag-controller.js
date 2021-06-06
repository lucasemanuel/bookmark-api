const { validationResult } = require('express-validator')
const { Tag } = require('../models')

module.exports = {
  index: async (req, res) => {
    const tags = await Tag.findAll()
    res.json(tags)
  },
  store: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Invalid Params!', errors: errors.array() })
    }

    const { name } = req.body
    const [tag] = await Tag.findOrCreate({ where: { name } })

    res.status(201).json(tag)
  }
}
