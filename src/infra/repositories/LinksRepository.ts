import Link from '../../domain/entities/Link'
import LinkDTO from '../../domain/dtos/LinkDTO'
import MongoDB, { database } from '../database/MongoDB'
import LinkFactory from '../../factories/LinkFactory'
import RepositoryBase from '../../domain/repositories/RepositoryBase'

class LinksRepository implements RepositoryBase<Link> {
  private readonly db: MongoDB

  constructor () {
    this.db = database
  }

  public async insert (link: Link): Promise<Link> {
    const { id, ...rest } = link
    const _id = MongoDB.generateObjectId(id)

    await this.db.getCollection('links').insertOne({ ...rest, _id })

    return LinkFactory.create({ ...rest, id: _id.toHexString() })
  }

  public async findById (id: string): Promise<Link | null> {
    try {
      const _id = MongoDB.generateObjectId(id)
      const linkDocument = await this.db.getCollection('links').findOne({ _id })

      if (!linkDocument) return null

      const { title, url } = linkDocument
      const link = LinkFactory.create({ id: _id.toHexString(), title, url })
      return link
    } catch (error) {
      return null
    }
  }

  public async findAll (): Promise<Link[]> {
    const linksDocument = await this.db
      .getCollection('links')
      .find()
      .toArray()

    const links = linksDocument.map(({ _id: id, title, url }) =>
      LinkFactory.create({ title, url, id })
    )
    return links
  }

  public async delete (link: Link): Promise<void> {
    const _id = MongoDB.generateObjectId(link.id)
    await this.db.getCollection('links').deleteOne({ _id })
  }
}

export default LinksRepository
