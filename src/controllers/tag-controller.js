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
  },
  update: async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Invalid Params', errors: errors.array() })
    }

    let tag = await Tag.findOne({ where: { id } })
    if (!tag) {
      return res.status(404).json({ message: 'Not Found!' })
    }

    tag = await tag.update({ name })
    res.status(200).json(tag)
  },
  destroy: async (req, res) => {
    const { id } = req.params
    const tag = await Tag.findOne({ where: { id } })

    if (!tag) {
      return res.status(404).json({ message: 'Not Found!' })
    }
    tag.destroy()
    res.status(204).send()
  }
}
