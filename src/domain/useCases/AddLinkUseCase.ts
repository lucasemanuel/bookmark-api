import Link from '../entities/Link'
import LinkDTO from '../dtos/LinkDTO'
import LinksRepository from '../repositories/RepositoryBase'

class AddLinkUseCase {
  constructor (private readonly linksRepository: LinksRepository<Link>) {}

  public async execute (data: LinkDTO): Promise<Link> {
    const link = await this.linksRepository.insert(data)
    return link
  }
}

export default AddLinkUseCase
