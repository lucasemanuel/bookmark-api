import Link from '../domain/entities/Link'
import LinkDTO from '../domain/dtos/LinkDTO'

abstract class LinkFactory {
  public static create (data: LinkDTO): Link {
    const { title, url, id } = data
    const link = new Link(title, url, id)
    return link
  }
}

export default LinkFactory
