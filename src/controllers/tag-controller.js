const { Tag } = require('../models')

module.exports = {
  index: async (req, res) => {
    const tags = await Tag.findAll()
    res.json(tags)
  },
  store: async (req, res) => {
    const { name } = req.body
    const [tag] = await Tag.findOrCreate({ where: { name } })

    res.status(201).json(tag)
  }
}
