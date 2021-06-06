const { Tag } = require('../models')

module.exports = {
  store: async (req, res) => {
    const { name } = req.body
    const [tag] = await Tag.findOrCreate({ where: { name } })

    res.status(201).json(tag)
  }
}
