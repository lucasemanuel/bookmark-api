const { Link, Tag } = require('../models')

module.exports = {
  index: async (req, res) => {
    const links = await Link.findAll()

    res.json(links)
  },
  store: async (req, res) => {
    const { title, url, tags } = req.body
    let link = await Link.create({ title, url })

    const promisesFindOrCreateTags = tags.map(({ name }) =>
      Tag.findOrCreate({
        where: { name }
      })
    )

    const promiseResults = await Promise.all(promisesFindOrCreateTags)
    for (const result of promiseResults) {
      const [tag] = result
      await link.addTag(tag)
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

    res.status(201).json(link)
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
