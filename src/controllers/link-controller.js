const { validationResult } = require('express-validator')
const { Link, Tag, sequelize } = require('../models')

module.exports = {
  index: async (req, res) => {
    const links = await Link.findAll({
      include: {
        model: Tag,
        as: 'tags'
      }
    })

    res.json(links)
  },
  store: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, url } = req.body
    let { tags } = req.body

    const transaction = await sequelize.transaction()
    try {
      const link = await Link.create({ title, url }, { transaction })

      if (tags) {
        const promisesFindOrCreateTags = tags.map(name =>
          Tag.findOrCreate({
            where: { name },
            transaction
          })
        )

        const promiseResults = await Promise.all(promisesFindOrCreateTags)
        tags = []
        for (const [tag] of promiseResults) {
          tags.push(tag)
          await link.addTag(tag, { transaction })
        }
      }

      await transaction.commit()
      return res.status(201).json({ ...link.toJSON(), tags })
    } catch (error) {
      await transaction.rollback()
      return res.status(500).json({
        message: 'Internal Server Error!'
      })
    }
  },
  update: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { title, url } = req.body

    let link = await Link.findOne({ where: { id }, include: 'tags' })
    if (!link) {
      return res.status(404).json({
        message: 'Not Found!'
      })
    }

    const data = {}
    if (title) data.title = title
    if (url) data.url = url

    link = await link.update(data)

    res.json(link)
  },
  destroy: async (req, res) => {
    const { id } = req.params
    const link = await Link.findOne({ where: { id } })
    link.destroy()

    res.status(204).send()
  }
}
