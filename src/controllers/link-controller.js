const { validationResult } = require('express-validator')
const { Link, Tag } = require('../models')

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

    const { title, url, tags } = req.body
    let link = await Link.create({ title, url })

    if (tags) {
      const promisesFindOrCreateTags = tags.map(name =>
        Tag.findOrCreate({
          where: { name }
        })
      )

      const promiseResults = await Promise.all(promisesFindOrCreateTags)
      for (const result of promiseResults) {
        await link.addTag(result[0])
      }

      link = await Link.findOne({
        where: {
          id: link.id
        },
        include: {
          model: Tag,
          as: 'tags'
        }
      })
    }

    return res.status(201).json(link)
  },
  update: async (req, res) => {
    const { id } = req.params
    const { title, url } = req.body

    const patch = {}
    if (title) patch.title = title
    if (url) patch.url = url

    await Link.update(patch, {
      where: {
        id
      }
    })
    const link = await Link.findOne({ where: { id } })

    res.json(link)
  },
  destroy: async (req, res) => {
    const { id } = req.params
    const link = await Link.findOne({ where: { id } })
    link.destroy()

    res.status(204).send()
  }
}
