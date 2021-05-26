const Link = require('../models/link')

module.exports = {
  store: async (req, res) => {
    const { title, url } = req.body
    const link = await Link.create({ title, url })

    res.status(201).json(link)
  }
}
