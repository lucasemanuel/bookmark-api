import Link from '../../domain/entities/Link'
import LinkDTO from '../../domain/dtos/LinkDTO'
import MongoDB, { database } from '../database/MongoDB'
import LinkFactory from '../../factories/LinkFactory'
import RepositoryBase from '../../domain/repositories/RepositoryBase'
import { ObjectId } from 'mongodb'

class LinksRepository implements RepositoryBase<Link> {
  private readonly db: MongoDB

  constructor () {
    this.db = database
  }

  public async insert (data: LinkDTO): Promise<Link> {
    const { id, ...rest } = data
    const _id = new ObjectId(id)

    await this.db.getCollection('links').insertOne({ ...rest, _id })

    return LinkFactory.create({ ...rest, id: _id.toHexString() })
  }

  public async findAll (): Promise<Link[]> {
    const linksDocument = await this.db
      .getCollection('links')
      .find()
      .toArray()

    const links = linksDocument.map(({ title, url, _id: id }) =>
      LinkFactory.create({ title, url, id })
    )
    return links
  }
}

export default LinksRepository
